import Parse from "../env.Backend/env.parseConfig.ts";
import React, { useState } from "react";
import InputField from "../components/InputField/InputField.tsx";
//import "../App.css";
import  "./Styling/StylingEvent.css";
import Button from "../components/Button/Button";
import { IoLocationOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { MdEuroSymbol } from "react-icons/md";



import HeaderProfile from "../components/HeaderProfile/HeaderProfile.tsx";

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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            {!formData.coverImagePreview && (
            <label htmlFor="coverImage" className="upload-image-label">
              Click to upload cover image...
            </label>
            )}
              <input
                type="file"
                id="coverImage"
                className="file-input"
                onChange={handleImageChange}
              />
              {formData.coverImagePreview && (
                <img src={formData.coverImagePreview} alt="Cover Preview" className="image-preview" />
              )}
            </div>

             
              <InputField
                variant="Text input"
                label="Title"
                placeholder="Write title here..."
                value={formData.title}
                onChange={handleChange}
                name="title"
                labelTextColor="white"
              />
        
          
            </div>
        </section>
      </header>
      
      <section>
        <InputField
          variant="Text input"
          label="Description"
          placeholder="Write description here..."
          value={formData.description}
          onChange={handleChange}
          name="description"
        />
        <InputField
          variant="Text input"
          label="Location"
          placeholder="Find Location"
          value={formData.location}
          onChange={handleChange}
          name="location"
          icon={<IoLocationOutline />} 

        />
        <InputField
          variant="Date"
          label="Date"
          value={formData.Date}
          onChange={handleChange}
          name="date"
        />
        <InputField
          variant="Text input"
          label="Participant Limit"
          placeholder="Enter limit..."
          value={formData.participantLimit}
          onChange={handleChange}
          name="participantLimit"
          icon={<GrGroup />}
        />
        <InputField
          variant="Text input"
          label="Price (leave empty if free)"
          placeholder="Enter price"
          value={formData.price}
          onChange={handleChange}
          name="price"
          icon={<MdEuroSymbol />}
        />
       
        <Button 
          label="Submit" 
          variant="primary" 
          onClick={() => handleSubmit} // Wrap handleSubmit in an anonymous function
          />
      </section>
    </form>
  );
}

export default CreateEvent;