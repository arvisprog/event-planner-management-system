import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import EventForm from "./EventForm";
import "../styles/Event.css";
import EventCard from "./EventCard";

function Home() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("");
  const [eventId, setEventId] = useState(null);
  const [eventData, setEventData] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.user.id;

  const getDataFromEventModal = (data) => {
    setIsOpen(data);
    setType("Create");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (eventId, date, name, location, description) => {
    setIsOpen(true);
    setType("Edit");
    setEventId(eventId);
    setEventData({
      date: date,
      name: name,
      location: location,
      description: description,
    });
  };

  async function getEvents() {
    const response = await axios.get("http://localhost:8000/api/events", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setEvents(response?.data);
    setFilteredEvents(response?.data);
  }

  useEffect(() => {
    getEvents();
    //eslint-disable-next-line
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;

    const filtered = events.filter(
      (event) =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredEvents(filtered);
  };

  return (
    <div>
      <NavigationBar
        name={user?.user?.name}
        handleEventModalData={getDataFromEventModal}
        handleSearch={handleSearch}
      />

      <div className="card-category-1">
        {filteredEvents?.map((event) => {
          const date = new Date(event.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const isOwnEvent = userId === event.userId;
          const attendeesCount = event.Attendees.length;
          const isUserAttending = event.Attendees.some(
            (attendee) => attendee.userId === userId
          );

          return (
            <EventCard
              key={event.id}
              eventId={event.id}
              eventDate={formattedDate}
              eventName={event.name}
              eventLocation={event.location}
              eventDescription={event.description}
              attendeesCount={attendeesCount}
              isOwnEvent={isOwnEvent}
              isUserAttending={isUserAttending}
              openModal={openModal}
              getEvents={getEvents}
            />
          );
        })}
      </div>
      <EventForm
        isModalOpen={modalIsOpen}
        closeModal={closeModal}
        type={type}
        eventId={eventId}
        eventData={eventData}
      />
    </div>
  );
}

export default Home;
