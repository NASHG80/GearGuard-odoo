const express = require("express");
const router = express.Router();

const {
  getAllRequests,
  createRequest,
  assignRequest,
  updateStatus,
  getRequestsByEquipment,
  getPreventiveCalendar
} = require("../controllers/request.controller");

// Get all requests
router.get("/", getAllRequests);

// Create new request
router.post("/", createRequest);
router.patch("/:id/assign", assignRequest);
router.patch("/:id/status", updateStatus);
router.get("/equipment/:id", getRequestsByEquipment);
router.get("/calendar/preventive", getPreventiveCalendar);

module.exports = router;