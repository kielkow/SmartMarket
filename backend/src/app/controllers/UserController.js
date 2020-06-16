import * as Yup from 'yup';
import { Op } from 'sequelize';

import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (req.query.name) {
      const users = await User.findAll({
        where: {
          name: {
            [Op.iRegexp]: req.query.name,
          },
        },
        order: ['id'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
        limit: 10,
        offset: (page - 1) * 10,
      });
      return res.json(users);
    }

    const users = await User.findAll({
      order: ['id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exist' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      user_id: Yup.number(),
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { user_id, email, oldPassword } = req.body;

    const user = await User.findByPk(user_id);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exist' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, provider, avatar } = await User.findByPk(user_id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({ id, name, email, provider, avatar });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    await user.destroy(user);

    return res.status(200).json();
  }
}

export default new UserController();
