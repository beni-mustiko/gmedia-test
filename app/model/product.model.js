const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "price", "image", "category_id"],

      properties: {
        name: {
          type: "string",
        },
        price: {
          type: "string",
        },
        image: {
          type: "string",
        },
        category_id: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Product;
