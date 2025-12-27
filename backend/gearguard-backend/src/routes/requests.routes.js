const express = require("express");
const router = express.Router();

const {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest
} = require("../controllers/request.controller");

router.get("/", getAllRequests);
router.post("/", createRequest);
router.get("/:id", getRequestById);
router.put("/:id", updateRequest);

module.exports = router;
