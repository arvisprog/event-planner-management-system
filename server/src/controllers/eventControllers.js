const Attendee = require("../models/attendee");
const Event = require("../models/event");
const User = require("../models/user");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, location } = req.body;
    const userId = req.user.id;
    const newEvent = await Event.create({
      name,
      description,
      date,
      location,
      userId,
    });
    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["date", "ASC"]],
      include: [
        {
          model: Attendee,
          include: [
            {
              model: User,
              attributes: ["id", "name"], // Adjust attributes as necessary
            },
          ],
        },
      ],
    });

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Attendee,
          include: [
            {
              model: User,
              attributes: ["id", "name"], // Adjust attributes as necessary
            },
          ],
        },
      ],
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.findAll({
      where: { userId },
      order: [["date", "ASC"]],
      include: [
        {
          model: Attendee,
          include: [
            {
              model: User,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const { name, description, date, location } = req.body;
    const userId = req.user.id;
    await event.update({ name, description, date, location, userId });
    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this event" });
    }
    await event.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
