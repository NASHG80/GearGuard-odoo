const express = require("express");
const router = express.Router();
const {
    createWorkCenter,
    getAllWorkCenters,
    getWorkCenterById
} = require("../controllers/workcenter.controller");

router.post("/", createWorkCenter);
router.get("/", getAllWorkCenters);
router.get("/:id", getWorkCenterById);

module.exports = router;
