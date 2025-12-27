const express = require("express");
const router = express.Router();
const {
    createEquipment,
    getAllEquipment,
    getEquipmentById
} = require("../controllers/equipment.controller");

router.post("/", createEquipment);
router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);

module.exports = router;
