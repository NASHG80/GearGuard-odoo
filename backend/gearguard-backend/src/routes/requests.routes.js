const express = require("express");
const router = express.Router();

const {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  updateRequestStatus
} = require("../controllers/request.controller");

router.get("/", getAllRequests);
router.post("/", createRequest);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);

/* ✅ REQUIRED FOR KANBAN */
router.patch("/:id/status", updateRequestStatus);

module.exports = router;
