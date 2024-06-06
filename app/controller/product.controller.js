const Product = require("../model/product.model");
const multer = require("multer");
const path = require("path");

const index = async (req, res) => {
  try {
    const products = await Product.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/image/product"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const fileName = req.body.name + "-" + uniqueSuffix + extension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const store = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const image = req.file ? `${req.file.filename}` : null;

    const product = await Product.query().insert({
      name,
      price,
      image,
      category_id,
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.query().findById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getAllByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const products = await Product.query().where("category_id", categoryId);

    res.status(200).json({
      status: 200,
      message: "success!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.query().findById(req.params.id).patch({
      name: req.body.name,
      email: req.body.email,
    });

    if (req.body.password) {
      await product
        .query()
        .findById(req.params.id)
        .patch({
          password: await bcrypt.hash(req.body.password, 10),
        });
    }

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  store,
  upload,
  show,
  update,
  getAllByCategoryId,
  destroy,
};
