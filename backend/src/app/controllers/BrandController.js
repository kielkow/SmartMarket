import * as Yup from 'yup';
import { Op } from 'sequelize';
import Brand from '../models/Brand';
import File from '../models/File';

class BrandController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (req.query.name) {
      const brands = await Brand.findAll({
        where: {
          name: {
            [Op.iRegexp]: req.query.name,
          },
        },
        order: ['id'],
        include: [
          {
            model: File,
            as: 'file',
            attributes: ['id', 'path', 'url'],
          },
        ],
        limit: 10,
        offset: (page - 1) * 10,
      });
      return res.json(brands);
    }

    const brands = await Brand.findAll({
      order: ['id'],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(brands);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // check if brand already exist
    const brandExists = await Brand.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (brandExists) {
      return res.status(400).json({ error: 'Brand already exist' });
    }

    // check if file exist
    const fileExists = await File.findOne({
      where: { id: req.body.file_id },
    });

    if (!fileExists) {
      return res.status(400).json({ error: 'File not exist' });
    }

    const brand = await Brand.create(req.body);

    return res.json(brand);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      description: Yup.string(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const brand = await Brand.findByPk(req.params.id, {
        include: [
          {
            model: File,
            as: 'file',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (!brand) return res.json({ error: 'Brand not found' });

      // check if brand already exist
      const brandExists = await Brand.findOne({
        where: {
          name: req.body.name,
        },
      });

      if (brandExists) {
        return res.status(400).json({ error: 'Brand already exist' });
      }

      // check if file exist
      const fileExists = await File.findOne({
        where: { id: req.body.file_id },
      });

      if (!fileExists) {
        return res.status(400).json({ error: 'File not exist' });
      }

      await brand.update(req.body);

      return res.json(brand);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new BrandController();
