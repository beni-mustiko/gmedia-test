const { check, validationResult } = require("express-validator");

const store = [
  check("user_id").not().isEmpty().withMessage("user_id can not be empty!"),

  check("product_id")
    .not()
    .isEmpty()
    .withMessage("product_id can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const update = [
  check("user_id").not().isEmpty().withMessage("user_id can not be empty!"),

  check("product_id")
    .not()
    .isEmpty()
    .withMessage("product_id can not be empty!"),

  check("status").not().isEmpty().withMessage("status can not be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  store,
  update,
};
