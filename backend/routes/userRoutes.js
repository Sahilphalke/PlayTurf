const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { registerSchema } = require("../validators/userValidator");
const validate = require("../middleware/validate");

router.post("/register", validate(registerSchema), userController.register);

module.exports = router;
