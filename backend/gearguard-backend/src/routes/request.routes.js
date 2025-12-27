const express = require("express");
const router = express.Router();

const {
  createRequest,
  assignRequest,
  updateStatus,
  getRequestsByEquipment,
  getPreventiveCalendar
} = require("../controllers/requests.controller");

router.post("/", createRequest);
router.patch("/:id/assign", assignRequest);
router.patch("/:id/status", updateStatus);
router.get("/equipment/:id", getRequestsByEquipment);
router.get("/calendar/preventive", getPreventiveCalendar);

module.exports = router;
