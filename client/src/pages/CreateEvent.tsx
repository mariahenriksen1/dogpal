import Parse from "../env.Backend/env.parseConfig.ts";
import React, { useState } from "react";
import "../App.css";
import UserProfile from "../components/UserProfile.tsx";

function CreateEvent() {
  const [formData, setFormData] = useState({
    coverImagePreview: "",
    title: "",
    description: "",
    location: "",
    Date: "",
    time: "",
    participantLimit: "",
    price: "",
  });

  async function addEvent() {
    try {
      const Event = new Parse.Object("Event");

      // Store the base64 image directly in the Event object
      if (formData.coverImagePreview) {
        Event.set("coverImage", formData.coverImagePreview); // store as base64 string
      }

      Event.set("title", formData.title);
      Event.set("description", formData.description);
      Event.set("date", new Date(formData.Date).getTime());
      Event.set("location", formData.location);
      Event.set("price", formData.price ? parseFloat(formData.price) : 0);
      Event.set("participantLimit", formData.participantLimit || "");

      await Event.save();
      alert("Event saved!");
    } catch (error) {
      console.log("Error saving new event: ", error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        coverImagePreview: reader.result as string, // base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  interface FormData {
    coverImagePreview: string;
    title: string;
    description: string;
    location: string;
    Date: string;
    time: string;
    participantLimit: string;
    price: string;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent();
  };

  return (
    <form className="flex-column gap-40" onSubmit={handleSubmit}>
      <header>
        <section>
          <div className="flex-column space-between gap-20">
            <div className="upload-image">
              <label htmlFor="coverImage">Click to upload cover image...</label>
              <input
                type="file"
                id="coverImage"
                className="file-input"
                onChange={handleImageChange}
              />

              {formData.coverImagePreview && (
                <img
                  src={formData.coverImagePreview}
                  alt="Cover Preview"
                  className="image-preview"
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="title" className="text color-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Write title here..."
                className="input-field color-white"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>
      </header>
      <section className="gap-20">
        <div className="form-group">
          <label htmlFor="description" className="text">
            Description
          </label>
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
          <label htmlFor="location" className="text">
            Location
          </label>
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
          <label htmlFor="time" className="text">
            Time
          </label>
          <input
            type="datetime-local"
            name="Date"
            id="time"
            className="input-field"
            value={formData.Date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="participantLimit" className="text">
            Participant Limit
          </label>
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
          <label htmlFor="price" className="text">
            Price (leave empty if free)
          </label>
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
      </section>
    </form>
  );
}

export default CreateEvent;
