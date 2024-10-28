import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function EventForm({ isModalOpen, closeModal, type, eventId, eventData }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (type === "Edit") {
      setDate(new Date(eventData.date).toLocaleDateString("en-CA"));
      setName(eventData.name);
      setLocation(eventData.location);
      setDescription(eventData.description);
    }
  }, [eventData]);

  const submit = async () => {
    if (type === "Edit") {
      const response = await axios.put(
        `http://localhost:8000/api/events/${eventId}`,
        {
          name,
          date,
          location,
          description,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
    } else {
      const response = await axios.post(
        "http://localhost:8000/api/events",

        {
          name,
          date,
          location,
          description,
        },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
    }
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header-container">
          <h2 className="header">{type} Event</h2>
          <button onClick={closeModal} className="close-button">
            <IoMdClose size={20} />
          </button>
        </div>
        <div className="container">
          <form id="form" className="form">
            <div className="form-control">
              <input
                type="text"
                placeholder="Event Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button onClick={submit}>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default EventForm;
