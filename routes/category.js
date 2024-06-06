const express = require("express");

const router = express.Router();

const CategoryController = require("../app/controller/category.controller");
const CategoryValidator = require("../app/validator/category.validator");
const AuthMiddleware = require("../middleware/auth.middleware");

/**
 * @openapi
 * /category:
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
router.get("/category", AuthMiddleware, CategoryController.index);

/**
 * @openapi
 * /category:
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
  "/category",
  AuthMiddleware,
  CategoryValidator.store,
  CategoryController.store
);

/**
 * @openapi
 * /category/{id}:
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
router.get("/category/:id", AuthMiddleware, CategoryController.show);

/**
 * @openapi
 * /category/{id}:
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
  "/category/:id",
  AuthMiddleware,
  CategoryValidator.update,
  CategoryController.update
);

/**
 * @openapi
 * /category/{id}:
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
router.delete("/category/:id", AuthMiddleware, CategoryController.destroy);

module.exports = router;
