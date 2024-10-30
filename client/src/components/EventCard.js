import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import "../styles/Event.css";

function EventCard({
  eventId,
  eventDate,
  eventName,
  eventLocation,
  eventDescription,
  attendeesCount,
  isOwnEvent,
  isUserAttending,
  openModal,
  getEvents,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const dateStyleClass = isOwnEvent ? "date" : "event-date";

  const joinEvent = async (eventId) => {
    try {
      await axios.post(
        "http://localhost:8000/api/attendees",
        { eventId },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      getEvents();
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const leaveEvent = async (eventId) => {
    await axios
      .delete(`http://localhost:8000/api/attendees/events/${eventId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then(() => {
        getEvents();
      })
      .catch((error) => {
        console.error("Error leaving event:", error);
      });
  };

  const deleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios
        .delete(`http://localhost:8000/api/events/${eventId}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        .then(() => {
          getEvents();
        })
        .catch((error) => {
          console.error("Error leaving event:", error);
        });
    }
  };

  return (
    <a
      className="basic-card basic-card-light"
      href={`/events/${eventId}`}
      key={eventId}
    >
      <div className="card-content">
        <p className={"card-text " + dateStyleClass}>{eventDate}</p>
        <span className="card-title">{eventName}</span>
        <p className="card-text">
          <IoLocationOutline style={{ marginRight: "5px" }} />
          {eventLocation}
        </p>
        <p className="card-text description">{eventDescription}</p>
        {attendeesCount > 0 && (
          <p className="card-text attendees">{attendeesCount} attendees</p>
        )}
      </div>

      <div className="card-link">
        {isOwnEvent ? (
          <>
            <button
              className="edit-button"
              onClick={() =>
                openModal(
                  eventId,
                  eventDate,
                  eventName,
                  eventLocation,
                  eventDescription
                )
              }
            >
              Edit Event
            </button>

            <button
              className="edit-button delete-button"
              onClick={() => deleteEvent(eventId)}
            >
              Delete Event
            </button>
          </>
        ) : (
          <>
            {isUserAttending ? (
              <button
                onClick={() => leaveEvent(eventId)}
                className="leave-button edit-button"
              >
                Leave Event
              </button>
            ) : (
              <button
                onClick={() => joinEvent(eventId)}
                className="edit-button"
              >
                Join Event
              </button>
            )}
          </>
        )}
      </div>
    </a>
  );
}

export default EventCard;
