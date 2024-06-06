const Cart = require("../model/cart.model");

const index = async (req, res) => {
  try {
    const carts = await Cart.query();

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: carts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    const cart = await Cart.query().insert({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: "1",
      status: "pending",
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: `Internal Server Error! ${error}`,
    });
  }
};

const show = async (req, res) => {
  try {
    const carts = await Cart.query()
      .where("user_id", req.params.id)
      .andWhere("status", "pending");

    res.status(200).json({
      status: 200,
      message: "OK!",
      data: carts,
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
    const cart = await Cart.query().findById(req.params.id).patch({
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      quantity: "1",
      status: "paid",
    });

    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: cart,
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
    const cart = await Cart.query().deleteById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: cart,
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
  show,
  update,
  destroy,
};
