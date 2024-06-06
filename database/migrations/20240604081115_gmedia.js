// migration file for creating tables or modifying existing tables
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary().unsigned();
      table.string("name");
      table.string("email");
      table.string("password");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable();
    })
    .createTable("categories", (table) => {
      table.increments("id").primary().unsigned();
      table.string("name");
    })
    .createTable("products", (table) => {
      table.increments("id").primary().unsigned();
      table.string("name");
      table.string("price");
      table.string("image");
      table.integer("category_id").unsigned().references("categories.id");
    })
    .createTable("cart", (table) => {
      table.increments("id").primary().unsigned();
      table.integer("user_id").unsigned().references("users.id");
      table.integer("product_id").unsigned().references("products.id").onDelete('CASCADE');
      table.integer("quantity").unsigned().defaultTo(1);
      table.string("status").defaultTo("pending");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("cart")
    .dropTableIfExists("products")
    .dropTableIfExists("categories")
    .dropTableIfExists("users");
};
