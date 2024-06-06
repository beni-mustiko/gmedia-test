const express = require("express");

const router = express.Router();

const ProductController = require("../app/controller/product.controller");
const ProductValidator = require("../app/validator/product.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /product:
 *  get:
 *     tags:
 *     - User
 *     summary: Get all user
 *     security:
 *	     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/product", AuthMiddleware, ProductController.index);

/**
 * @openapi
 * /product:
 *  post:
 *     tags:
 *     - User
 *     summary: Add User
 *     security:
 *	     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */

router.post(
  "/product",
  AuthMiddleware,
  // ProductValidator.store,
  ProductController.upload.single("image"),
  ProductController.store
);

/**
 * @openapi
 * /product/{id}:
 *  get:
 *     tags:
 *     - User
 *     summary: Get user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/product/:id", AuthMiddleware, ProductController.show);

/**
 * @openapi
 * /product/{id}:
 *  put:
 *     tags:
 *     - User
 *     summary: Update User
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - email
 *              - password
 *            properties:
 *              name:
 *               type: string
 *              email:
 *               type: string
 *              password:
 *               type: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      422:
 *        description: Unprocessable Entity
 *      500:
 *        description: Server Error
 */
router.put(
  "/product/:id",
  AuthMiddleware,
  ProductValidator.update,
  ProductController.update
);

/**
 * @openapi
 * /product/{id}:
 *  delete:
 *     tags:
 *     - User
 *     summary: Delete user
 *     security:
 *	     - bearerAuth: []
 *     parameters:
 *     - name: id
 *       in: path
 *       description: The unique id of the user
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/product/:id", AuthMiddleware, ProductController.destroy);

router.get(
  "/product/category/:id",
  AuthMiddleware,
  ProductController.getAllByCategoryId
);

module.exports = router;
