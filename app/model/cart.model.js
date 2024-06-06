const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Cart extends Model {
  static get tableName() {
    return "cart";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "product_id", "quantity", "status"],

      properties: {
        user_id: {
          type: "string",
        },
        product_id: {
          type: "string",
        },
        quantity: {
          type: "string",
        },
        status: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Cart;
