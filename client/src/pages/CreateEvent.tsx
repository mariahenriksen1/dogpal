import React, { useState } from "react"; // Import useState for state management
import "../App.css";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    time: "",
    participantLimit: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="container" onSubmit={handleSubmit}> 
      <div className="image-container"> 
        <label htmlFor="coverImage" className="text">
          Click to upload cover image...
        </label>
        <input
          type="file"
          id="coverImage" 
          className="file-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="title" className="text">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Write title here..."
          className="input-field"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="text">Description</label>
        <textarea
          name="description"
          id="description" 
          placeholder="Write description here..."
          className="input-field"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location" className="text">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Find Location"
          className="input-field"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="time" className="text">Time</label>
        <input
          type="datetime-local"
          name="time"
          id="time" 
          className="input-field"
          value={formData.time}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="participantLimit" className="text">Participant Limit</label>
        <input
          type="number"
          name="participantLimit"
          id="participantLimit" 
          placeholder="Enter limit..."
          className="input-field"
          value={formData.participantLimit}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="text">Price (leave empty if free)</label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Enter price"
          className="input-field"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="createEventButton"> 
        Create event
      </button>
    </form>
  );
}

export default CreateEvent;
