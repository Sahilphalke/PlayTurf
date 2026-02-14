const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { registerSchema, loginSchema } = require("../validators/userValidator");
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");

router.post("/register", validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.get("/profile", authenticate, userController.getProfile);

module.exports = router;
