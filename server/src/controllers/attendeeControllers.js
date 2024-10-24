const Attendee = require("../models/attendee");

exports.saveAttendee = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req?.user?.id;

    const newAttendee = await Attendee.create({
      userId,
      eventId,
    });
    return res.status(201).json(newAttendee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
