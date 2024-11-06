import React, { useState } from 'react';
import Parse from '../Backend/parseConfig'; // Ensure the correct path to your Parse config

export const EventComponent = () => {
  const [event, setEvent] = useState<Parse.Object | null>(null);

  // Function to add an event
  async function addEvent() {
    try {
      const Event = new Parse.Object('Event');
      
      Event.set('title', 'Sample Event');
      Event.set('creatorId', 101);
      Event.set('description', 'This is a sample event description.');
      Event.set('date', Date.now());
      Event.set('location', 12345);
      Event.set('price', 99);
  
      // Save the Event
      await Event.save();
      alert('Event saved!');
    } catch (error) {
      console.log('Error saving new event: ', error);
    }
  }
  // Function to fetch an event
  async function fetchEvent() {
    try {
      const query = new Parse.Query('Event');
      query.equalTo('title', 'Sample Event');
      const Event = await query.first();

      if (Event) {
        console.log('Event details:', {
          title: Event.get('title'),
          description: Event.get('description'),
          date: Event.get('date'),
          location: Event.get('location'),
          price: Event.get('price'),
          id: Event.id,
        });
        setEvent(Event);
      } else {
        console.log('No event found');
      }
    } catch (error) {
      console.log('Error fetching event: ', error);
    }
  }

  return (
    <>
      <h1>Event</h1>
      <div>
        <button onClick={addEvent}>Add Event</button>
        <button onClick={fetchEvent}>Fetch Event</button>
        {event && (
          <div>
            <p>{`Title: ${event.get('title')}`}</p>
            <p>{`Creator ID: ${event.get('creatorId')}`}</p>
            <p>{`Description: ${event.get('description')}`}</p>
            <p>{`Date: ${new Date(event.get('date')).toLocaleString()}`}</p>
            <p>{`Location: ${event.get('location')}`}</p>
            <p>{`Price: $${event.get('price')}`}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EventComponent;
