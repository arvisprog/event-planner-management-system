const Attendee = require("../models/attendee");

exports.saveAttendee = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req?.user?.id;

    const existingAttendee = await Attendee.findOne({
      where: {
        userId,
        eventId,
      },
    });

    if (existingAttendee) {
      return res
        .status(400)
        .json({ message: "User is already registered for this event." });
    }

    const newAttendee = await Attendee.create({
      userId,
      eventId,
    });
    return res.status(201).json(newAttendee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAttendee = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req?.user?.id;

    const attendee = await Attendee.findOne({
      where: {
        userId,
        eventId,
      },
    });

    if (!attendee) {
      return res
        .status(404)
        .json({ message: "User is not registered for this event." });
    }

    await Attendee.destroy({
      where: {
        userId,
        eventId,
      },
    });

    return res.status(200).json({ message: "Successfully left the event." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
