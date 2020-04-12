import * as Yup from 'yup';
import { Op } from 'sequelize';
import Type from '../models/Type';

class TypeController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (req.query.name) {
      const types = await Type.findAll({
        where: {
          name: {
            [Op.iRegexp]: req.query.name,
          },
        },
        order: ['id'],
        limit: 10,
        offset: (page - 1) * 10,
      });
      return res.json(types);
    }

    const types = await Type.findAll({
      order: ['id'],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(types);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // check if type already exist
    const typeExists = await Type.findOne({
      where: {
        name: req.body.name,
        description: req.body.description,
      },
    });

    if (typeExists) {
      return res.status(400).json({ error: 'Type already exist' });
    }

    const type = await Type.create(req.body);

    return res.json(type);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const type = await Type.findByPk(req.params.id);

      if (!type) return res.json({ error: 'Type not found' });

      // check if type already exist
      const typeExists = await Type.findOne({
        where: {
          name: req.body.name,
          description: req.body.description,
        },
      });

      if (typeExists) {
        return res.status(400).json({ error: 'Type already exist' });
      }

      await type.update(req.body);

      return res.json(type);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new TypeController();
