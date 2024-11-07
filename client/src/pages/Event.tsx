import React, { useState, useEffect } from 'react';
import Parse from '../Backend/parseConfig'; // Ensure the correct path to your Parse config
import { TextField } from '@mui/material';
import pictureEvent from "/src/assets/PictureEvent.png";
import './Styling/StylingEvent.css';

// Sample attendees
const attendees = [
  { ID: 1, Name: "Mogens Mogensen", Dog: "Charlie", Comments: "Hej alle sammen. Jeg glæder mig til at se jer til hundetræning i morgen..." },
  { ID: 2, Name: "Julie Nielsen", Dog: "Hannibal", Comments: "Mega fedt initiativ! Hannibal og jeg ser altid frem til den månedlige hundetræning..." },
  { ID: 3, Name: "Freja Sunesen", Dog: "Konrad", Comments: "Hej alle sammen. Konrad og jeg glæder os til at se jer i morgen..." },
];

const Event = () => {
  const [events, setEvents] = useState<Parse.Object[]>([]); // State for multiple events
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    fetchEvents();  // Fetch events when the component mounts
  }, []);

  // Fetch all events from Parse
  const fetchEvents = async () => {
    try {
      const query = new Parse.Query('Event');
      const fetchedEvents = await query.find();  // Fetch all events

      if (fetchedEvents.length > 0) {
        console.log('Fetched Events:', fetchedEvents);  // Log fetched events
        setEvents(fetchedEvents);  // Update state with all events
      } else {
        console.log('No events found');  // Log if no events are found
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);  // Set loading to false when done
    }
  };

  // Add an event to the database
  const addEvent = async () => {
    try {
      const newEvent = new Parse.Object('Event');
      newEvent.set('title', 'Hundetræning i hundeskoven');
      newEvent.set('creatorId', 101); // Example creator ID
      newEvent.set('description', 'Glæd jer til månedens hundetræning...');
      newEvent.set('date', Date.now());
      newEvent.set('location', 'Brøndby Hundeskov');
      newEvent.set('price', 0);

      await newEvent.save();
      alert('Event saved!');
      fetchEvents(); // Refresh the event list
    } catch (error) {
      console.log('Error saving event:', error);
      alert('Error saving event');
    }
  };

  const eventprice = (price: number) => price === 0 ? "Free" : `${price} DKK`;

  // Show loading message if events are still being fetched
  if (loading) {
    return <div>Loading events...</div>;
  }

  // Handle the comment change (this is a placeholder, needs implementation)
  const handleCommentChange = (ID: number, value: string) => {
    console.log(`Comment for attendee ${ID}: ${value}`);
  };

  return (
    <>
      {/* Event List Section */}
      <div className='eventList'>
        <h2>Event List</h2>
        {events.map(event => (
          <div key={event.id} className='eventItem'>
            <h3>{event.get('title')}</h3>
            <p>{event.get('description')}</p>
            <p>{new Date(event.get('date')).toLocaleString()}</p>
            <p>{event.get('location')}</p>
            <p>{eventprice(event.get('price'))}</p>
          </div>
        ))}
      </div>

      {/* Event Details */}
      
       
         
      <div className='titleBar'>
  <img className='pictureEvent' src={pictureEvent} alt="Event" />

  <div className='eventList'>
    {events.map(event => (
      <div key={event.id} className='eventDetails'>
        <div className='titleRow'>
          <div className='titleColumn'>
            <h1 className='EventTitle'>{event.get('title')}</h1>
          </div>
          <div className='spacerColumn'></div>
          <div className='priceAndSignUp'>
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none">
              <path d="M15.2981 16.8302C14.0289 18.9455 11.9711 18.9455 10.7019 16.8302..." stroke="white" strokeWidth="2" />
            </svg>
            <p className='eventPrice'>{eventprice(event.get('price'))}</p>
            <button className='buttonSignUp'>Sign Up</button>
          </div>
        </div>

        <div className='descriptionBar'>
          <div className='EventDate'>
            <p className='EventMonth'>{new Date(event.get('date')).toLocaleString('default', { month: 'short' })}</p>
            <p className='EventDate'>{new Date(event.get('date')).getDate()}</p>
          </div>

          <p className='EventTime'>{new Date(event.get('date')).toLocaleTimeString()}</p>
          <p className='EventLocation'>{event.get('location')}</p>
          <p className='EventCreator'>By {event.get('creatorId')}</p>
        </div>

        <div className='description'>
          {event.get('description')}
        </div>
      </div>
    ))}
  </div>
</div>

        
        <div className='description'>
        </div>

        {/* Comments Section */}
        <div className='comments'>
          <h3 className='commenttitle'>Comments</h3>
          {attendees.map(attendee => (
            <div key={attendee.ID}>
              <p>{attendee.Name}</p>
              <p>{attendee.Dog}</p>
              <p>{attendee.Comments}</p>
              <TextField
                label="Add Comment"
                variant="outlined"
                onChange={(e) => handleCommentChange(attendee.ID, e.target.value)}
              />
            </div>
          ))}
        </div>
      
    </>
  );
};

export default Event;
