const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

//Definir las rutas
router.get("/", userController.getAllUser);

router.get("/:email", userController.getUserByEmail);

router.post("/", userController.addUser);

router.put("/:email", userController.updateUser);

router.delete("/:email", userController.deleteUser);

module.exports = router;
