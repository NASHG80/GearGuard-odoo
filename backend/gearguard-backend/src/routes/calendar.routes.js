const express = require("express");
const router = express.Router();

const {
  getCalendarData,
  getTasksForDay,
} = require("../controllers/calendar.controller");

router.get("/", getCalendarData);
router.get("/day", getTasksForDay);

module.exports = router;
