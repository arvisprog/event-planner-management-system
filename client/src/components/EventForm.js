import React from "react";
import Modal from "react-modal";
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

function EventForm({ isModalOpen, closeModal }) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="header-container">
          <h2 class="header">Create Event</h2>
          <button onClick={closeModal} className="close-button">
            <IoMdClose size={20} />
          </button>
        </div>
        <div class="container">
          <form id="form" class="form">
            <div class="form-control">
              <input type="text" placeholder="Event Name" />
            </div>
            <div class="form-control">
              <input type="date" />
            </div>
            <div class="form-control">
              <input type="text" placeholder="Location" />
            </div>
            <div class="form-control">
              <textarea placeholder="Description" />
            </div>
            <button>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default EventForm;
