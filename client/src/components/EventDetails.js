import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "./NavigationBar";
import EventForm from "./EventForm";
import { IoLocationOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

function EventDetails({
  eventDate,
  eventName,
  eventLocation,
  eventDescription,
  attendeesCount,
  isOwnEvent,
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const dateStyleClass = isOwnEvent ? "date" : "event-date";

  const { id } = useParams();

  const getDataFromEventModal = (data) => {
    setIsOpen(data);
    setType("Create");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
  };

  const listItems = eventData?.Attendees?.map((d) => (
    <li key={d.User.name}>{d.User.name}</li>
  ));

  const getEventById = async () => {
    const response = await axios.get(`http://localhost:8000/api/events/${id}`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    console.log("response", response);
    setEventData(response.data);
  };

  useEffect(() => {
    getEventById();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <NavigationBar
        name={user?.user?.name}
        handleEventModalData={getDataFromEventModal}
        handleSearch={handleSearch}
      />
      <div className="">
        <p>Event details</p>
        <p className={"" + dateStyleClass}>{eventData.date}</p>
        <span className="">{eventData.name}</span>

        <p className="">
          <IoLocationOutline style={{ marginRight: "5px" }} />
          {eventData.location}
        </p>
        <p className="">{eventData.description}</p>
        {listItems}
        <EventForm
          isModalOpen={modalIsOpen}
          closeModal={closeModal}
          type={type}
          eventId={eventId}
          eventData={eventData}
        />
      </div>
    </>
  );
}

export default EventDetails;
