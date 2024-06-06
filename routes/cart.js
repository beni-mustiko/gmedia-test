const express = require("express");

const router = express.Router();

const CartController = require("../app/controller/cart.controller");
const CartValidator = require("../app/validator/cart.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /cart:
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
router.get("/api/cart", AuthMiddleware, CartController.index);

/**
 * @openapi
 * /cart:
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
  "/api/cart",
  AuthMiddleware,
  CartValidator.store,
  CartController.store
);

/**
 * @openapi
 * /cart/{id}:
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
router.get("/api/cart/:id", AuthMiddleware, CartController.show);

/**
 * @openapi
 * /cart/{id}:
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
  "/api/cart/:id",
  AuthMiddleware,
  CartController.update
);

/**
 * @openapi
 * /cart/{id}:
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
router.delete("/cart/:id", AuthMiddleware, CartController.destroy);

module.exports = router;
