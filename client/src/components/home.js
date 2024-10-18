import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { useSelector } from "react-redux";
import { IoLocationOutline } from "react-icons/io5";

import axios from "axios";
import "../styles/Event.css";

function Home() {
  const [events, setEvents] = useState([]);

  const user = useSelector((state) => state.auth.auth.user);
  const userId = user.user.id;
  console.log(userId);

  async function getEvents() {
    const response = await axios.get("http://localhost:8000/api/events", {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    setEvents(response?.data);
  }

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavigationBar name={user?.user?.name}></NavigationBar>
      <div class="card-category-1">
        {events?.map((event) => {
          const date = new Date(event.date);
          const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          const isOwnEvent = userId === event.userId;
          console.log("here", isOwnEvent);
          return (
            <div class="basic-card basic-card-light" key={event.id}>
              <div class="card-content">
                <p class="card-text date">{formattedDate}</p>
                <span class="card-title">{event.name}</span>
                <p class="card-text">
                  <IoLocationOutline style={{ marginRight: "5px" }} />
                  {event.location}
                </p>

                <p class="card-text description">{event.description}</p>
              </div>

              <div class="card-link">
                {isOwnEvent ? (
                  <a href="/home" title="Read Full">
                    Edit Event
                  </a>
                ) : (
                  <a href="/home" title="Read Full">
                    Join Event
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
