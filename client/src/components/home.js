import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import EventForm from "./EventForm";
import "../styles/Event.css";

function Home() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [eventId, setEventId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user.id;

  const getDataFromEventModal = (data) => {
    setIsOpen(data);
    setType("Create");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (eventId) => {
    setIsOpen(true);
    setType("Edit");
    setEventId(eventId);
  };

  async function getEvents() {
    const response = await axios.get("http://localhost:8000/api/events", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setEvents(response?.data);
  }

  useEffect(() => {
    getEvents();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavigationBar
        name={user?.user?.name}
        handleEventModalData={getDataFromEventModal}
      />
      <div className="card-category-1">
        {events?.map((event) => {
          const date = new Date(event.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const isOwnEvent = userId === event.userId;
          return (
            <div className="basic-card basic-card-light" key={event.id}>
              <div className="card-content">
                <p className="card-text date">{formattedDate}</p>
                <span className="card-title">{event.name}</span>
                <p className="card-text">
                  <IoLocationOutline style={{ marginRight: "5px" }} />
                  {event.location}
                </p>

                <p className="card-text description">{event.description}</p>
              </div>

              <div className="card-link">
                {isOwnEvent ? (
                  <button onClick={() => openModal(event.id)}>
                    Edit Event
                  </button>
                ) : (
                  <a href="/home">Join Event</a>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <EventForm
        isModalOpen={modalIsOpen}
        closeModal={closeModal}
        type={type}
        eventId={eventId}
      />
    </div>
  );
}

export default Home;
