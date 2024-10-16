const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userControllers");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventControllers");

//Auth
router.post("/register", userController.register);
router.post("/login", userController.login);

//Events
router.post("/events", authMiddleware, createEvent);
router.get("/events", authMiddleware, getAllEvents);
router.get("/events/:id", authMiddleware, getEventById);
router.put("/events/:id", authMiddleware, updateEvent);
router.delete("/events/:id", authMiddleware, deleteEvent);

module.exports = router;
