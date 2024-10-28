import React from "react";
import "../App.css"; 

function CreateEvent() {
  return (
    <div className="container"> {/* Main container for the event creation form */}
      <div className="image-container"> {/* Image upload section */}
        <label htmlFor="coverImage" className="text">
          Click to upload cover image...
        </label>
        <input type="file" id="coverImage" style={{ display: "none" }} />
      </div>

      <div className="form-group"> {/* Grouping form fields for better styling */}
        <label htmlFor="title" className="text">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Write title here..."
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="text">Description</label>
        <textarea
          name="description"
          placeholder="Write description here..."
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location" className="text">Location</label>
        <input
          type="text"
          name="location"
          placeholder="Find Location"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="datetime-local" className="text">Time</label>
        <input
          type="datetime-local"
          name="time"
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="participantLimit" className="text">Participant Limit</label>
        <input
          type="number"
          name="participantLimit"
          placeholder="Enter limit..."
          className="input-field"
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="text">Price (leave empty if free)</label>
        <input
          type="text"
          name="price"
          placeholder="Enter price (leave empty if free)"
          className="input-field"
        />
      </div>

      <button type="submit" className="createEventButton"> 
        Create event
      </button>
    </div>
  );
}

export default CreateEvent;
