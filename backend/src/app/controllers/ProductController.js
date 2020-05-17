import * as Yup from 'yup';
import { Op } from 'sequelize';
import Product from '../models/Product';
import Type from '../models/Type';
import Brand from '../models/Brand';
import File from '../models/File';

class ProductController {
  async index(req, res) {
    const { page = 1 } = req.query;

    if (req.query.name) {
      const products = await Product.findAll({
        where: {
          name: {
            [Op.iRegexp]: req.query.name,
          },
        },
        order: ['id'],
        include: [
          {
            model: Type,
            as: 'type',
            attributes: ['name', 'description'],
          },
          {
            model: Brand,
            as: 'brand',
            attributes: ['name', 'description'],
            include: [
              {
                model: File,
                as: 'file',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
          {
            model: File,
            as: 'file',
            attributes: ['id', 'path', 'url'],
          },
        ],
        limit: 10,
        offset: (page - 1) * 10,
      });
      return res.json(products);
    }

    const products = await Product.findAll({
      order: ['id'],
      include: [
        {
          model: Type,
          as: 'type',
          attributes: ['name', 'description'],
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['name', 'description'],
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 10,
      offset: (page - 1) * 10,
    });
    return res.json(products);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      type_id: Yup.number().required(),
      brand_id: Yup.number().required(),
      file_id: Yup.number().required(),
      price: Yup.string().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // check if product already exist
    const productExists = await Product.findOne({
      where: {
        name: req.body.name,
        type_id: req.body.type_id,
        brand_id: req.body.brand_id,
        file_id: req.body.file_id,
      },
    });

    if (productExists) {
      return res.status(400).json({ error: 'Product already exist' });
    }

    // check if type exist
    const typeExists = await Type.findOne({
      where: { id: req.body.type_id },
    });

    if (!typeExists) {
      return res.status(400).json({ error: 'Type not exist' });
    }

    // check if brand exist
    const brandExists = await Brand.findOne({
      where: { id: req.body.brand_id },
    });

    if (!brandExists) {
      return res.status(400).json({ error: 'Brand not exist' });
    }

    // check if file exist
    const fileExists = await File.findOne({
      where: { id: req.body.file_id },
    });

    if (!fileExists) {
      return res.status(400).json({ error: 'File not exist' });
    }

    const product = await Product.create(req.body);

    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      type_id: Yup.number(),
      brand_id: Yup.number(),
      file_id: Yup.number(),
      price: Yup.string(),
      amount: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Type,
            as: 'type',
            attributes: ['name', 'description'],
          },
          {
            model: Brand,
            as: 'brand',
            attributes: ['name', 'description'],
            include: [
              {
                model: File,
                as: 'file',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
          {
            model: File,
            as: 'file',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (!product) return res.json({ error: 'Product not found' });

      // check if product already exist
      const productExists = await Product.findOne({
        where: {
          name: req.body.name,
          type_id: req.body.type_id,
          brand_id: req.body.brand_id,
          file_id: req.body.file_id,
        },
      });

      if (productExists) {
        return res.status(400).json({ error: 'Product already exist' });
      }

      // check if type exist
      const typeExists = await Type.findOne({
        where: { id: req.body.type_id },
      });

      if (!typeExists) {
        return res.status(400).json({ error: 'Type not exist' });
      }

      // check if brand exist
      const brandExists = await Brand.findOne({
        where: { id: req.body.brand_id },
      });

      if (!brandExists) {
        return res.status(400).json({ error: 'Brand not exist' });
      }

      // check if file exist
      const fileExists = await File.findOne({
        where: { id: req.body.file_id },
      });

      if (!fileExists) {
        return res.status(400).json({ error: 'File not exist' });
      }

      await product.update(req.body);

      return res.json(product);
    } catch (err) {
      return res.json(err);
    }
  }

  async delete(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Type,
            as: 'type',
            attributes: ['name', 'description'],
          },
          {
            model: Brand,
            as: 'brand',
            attributes: ['name', 'description'],
            include: [
              {
                model: File,
                as: 'file',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
          {
            model: File,
            as: 'file',
            attributes: ['id', 'path', 'url'],
          },
        ],
      });

      if (!product) return res.json({ error: 'Product not found' });

      product.active = false;

      await product.save();

      return res.json(product);
    } catch (err) {
      return res.json(err);
    }
  }
}

export default new ProductController();
