import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import EventForm from "./EventForm";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import "../styles/EventDetails.css";

function EventDetails() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [eventData, setEventData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();

  const getDataFromEventModal = (data) => {
    setIsOpen(data);
    setType("Create");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const listItems = eventData?.Attendees?.map((d) => (
    <li key={d.User.name} className="attendee">
      <div className="avatar">
        <h5>{d.User.name.charAt(0)}</h5>
      </div>
      <h5 className="attendee-name">{d.User.name}</h5>
      <h5 className="attendee-email">{d.User.email}</h5>
    </li>
  ));

  const getEventById = async () => {
    const response = await axios.get(`http://localhost:8000/api/events/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setEventData(response.data);
  };

  useEffect(() => {
    getEventById();
    //eslint-disable-next-line
  }, []);

  const formattedDate = new Date(eventData.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <NavigationBar
        name={user?.user?.name}
        handleEventModalData={getDataFromEventModal}
      />
      <div className="card-wrapper">
        <div className="card left">
          <div className="event-content">
            <h2 className="event-title">{eventData.name}</h2>
            <a className="event-link">{formattedDate}</a>
            <div className="event-detail">
              <h4 className="event-location">
                <IoLocationOutline style={{ marginRight: "5px" }} />
                {eventData.location}
              </h4>
              <h3>About this Event: </h3>
              <p>{eventData.description}</p>
            </div>
          </div>
        </div>
        <div className="card right">
          <div className="event-content">
            <div className="attendes-container">
              <h2 className="attendee-title">Attendees</h2>
              <p className="attendees-number">
                {eventData?.Attendees?.length} attendees
              </p>
            </div>
            <ul>{listItems}</ul>
            {eventData?.Attendees?.length === 0 && <p>No attendees yet</p>}
          </div>
        </div>
      </div>
      <EventForm
        isModalOpen={modalIsOpen}
        closeModal={closeModal}
        type={type}
      />
    </>
  );
}

export default EventDetails;
