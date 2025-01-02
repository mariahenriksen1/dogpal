import React, { useState } from "react";
import InputField from "../components/InputField/InputField.tsx";
import "../App.css";
import "./Styling/StylingEvent.css";
import Button from "../components/Button/Button";
import { IoLocationOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { MdEuroSymbol } from "react-icons/md";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateEvent } from "../hooks/useCreateEvent";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

function CreateEvent() {
  const { createEvent, loading, error, success } = useCreateEvent();
  const [formData, setFormData] = useState<{
    coverImagePreview: string | ArrayBuffer | null;
    title: string;
    description: string;
    location: string;
    date: string;
    participantLimit: string;
    price: string;
    startTime: string | undefined;
    endTime: string | undefined;
  }>({
    coverImagePreview: "",
    title: "",
    description: "",
    location: "",
    date: "",
    participantLimit: "",
    price: "",
    startTime: undefined,
    endTime: undefined,
  });

  const resetForm = () => {
    setFormData({
      coverImagePreview: "",
      title: "",
      description: "",
      location: "",
      date: "",
      participantLimit: "",
      price: "",
      startTime: undefined,
      endTime: undefined,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prevData) => ({
        ...prevData,
        coverImagePreview: reader.result,
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

  const handleTimeChange = (name: string, value: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const startTime = formData.startTime ? parseInt(formData.startTime.replace(":", ""), 10) : undefined;
      const endTime = formData.endTime ? parseInt(formData.endTime.replace(":", ""), 10) : undefined;

      if (startTime && endTime && startTime >= endTime) {
        toast.error("Start time must be before end time.");
        return;
      }

      await createEvent({
        title: formData.title,
        description: formData.description,
        location: formData.location,
        date: new Date(formData.date).getTime(),
        startTime,
        endTime,
        participantLimit: formData.participantLimit
          ? parseInt(formData.participantLimit, 10)
          : undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        coverImage: typeof formData.coverImagePreview === "string" ? formData.coverImagePreview : undefined,
      });

      toast.success("Event created!");
      resetForm(); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to create event. Please try again.");
    }
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
                <img
                  src={typeof formData.coverImagePreview === "string" ? formData.coverImagePreview : undefined}
                  alt="Cover Preview"
                  className="image-preview"
                />
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
          value={formData.date}
          onChange={handleChange}
          name="date"
        />
        <div className="form-group">
          <label className="form-label">Start Time</label>
          <TimePicker
            className="custom-time-picker"
            onChange={(value) => handleTimeChange("startTime", value)}
            value={formData.startTime}
            disableClock={true}
            format="HH:mm"
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Time</label>
          <TimePicker
            className="custom-time-picker"
            onChange={(value) => handleTimeChange("endTime", value)}
            value={formData.endTime}
            disableClock={true}
            format="HH:mm"
          />
        </div>
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
          label={loading ? "Creating..." : "Submit"}
          variant="primary"
          onClick={() => handleSubmit(new Event('submit') as unknown as React.FormEvent)}
        />
      </section>
      <ToastContainer position="bottom-right" autoClose={3000} transition={Slide} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}></p>}
    </form>
  );
}

export default CreateEvent;
