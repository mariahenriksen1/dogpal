import { Comment, Start, Title } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/StylingEvent.css';

import pictureEvent from "/src/assets/PictureEvent.png";

const attendees = [
  { ID: 1, Name: "Mogens Mogensen", Dog: "Charlie", Comments: "Hej alle sammen. Jeg glæder mig til at se jer til hundetræning i morgen. Charlie og jeg har trænet indkald hele ugen, så vi er klar til at vise jer vores fremskridt. Vi har også øvet os på at gå pænt i snor, så vi er klar til at tage udfordringen op. Vi ses i morgen!" },
  { ID: 2, Name: "Julie Nielsen", Dog: "Hannibal", Comments: "Mega fedt initiativ! Hannibal og jeg ser altid frem til den månedlige hundetræning. Hvis der er nogle nye med til denne måneds træning, så vil jeg lige videregive et tip. Da det godt kan blive lidt køligt, så er min erfaring, at Hannibal kan koncentrere sig om træning i længere tid, hvis vi har et lille tæppe med, hun kan sidde på / putte sig i :)Vi glæder os til at se jer i hundeskoven!" },  
  { ID: 3, Name: "Freja Sunesen", Dog: "Konrad", Comments:"Hej alle sammen. Konrad og jeg glæder os til at se jer i morgen. Vi har trænet indkald og gå pænt i snor, så vi er klar til at tage udfordringen op. Vi ses i morgen!" },
];

const event = {
  id: 1,
  Title: "Hundetræning i hundeskoven",
  Description: "Glæd jer til månedens hundetræning i Brøndby Hundeskov. Denne måneds fokus kommer til at være socialisering og lydighedstræning. Vi vil arbejde indkald og gå pænt i snor. Alle hunde er velkomne uanset erfaring og niveau. Husk at medbringe godbidder, vand og masser af energi! Vi glæder os til at se jer til en sjov og lærerig dag i hundeskoven.",
  DateAndTimeStart: "2024-12-11T10:00:00",
  DateAndTimeEnd: "2022-12-11T12:00:00",
  Location: "Brøndby Hundeskov",
  Creator: "Mogens Mogensen",
  Price: 0,
  Image: pictureEvent
};

function eventprice(price: number) {
  return price === 0 ? "Free" : `${price} DKK`;
}

function eventmonth(date: string | number | Date) {
  const month = new Date(date).getMonth();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[month];
}

function eventday(date: string | number | Date) {
  return new Date(date).getDate();
}

function eventtimeStart(date: string | number | Date) {
  return new Date(date).getHours();
}

function eventTimeEnd(date: string | number | Date) {
  return new Date(date).getHours();
}

const Event = () => {
  return (
    <div>
      <div className='titleBar'>
        <img className='pictureEvent' src={pictureEvent} alt="" />

        <div className='titleRow'>
          {/* Column 1: Event Title */}
          <div className='titleColumn'>
            <h1 className='EventTitle'>{event.Title}</h1>
          </div>

          {/* Column 2: Spacer */}
          <div className='spacerColumn'></div>

          {/* Column 3: Price and Sign Up Button */}
          <div className='priceAndSignUp'>
         
          
              <svg  xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none">
                <path d="M15.2981 16.8302C14.0289 18.9455 11.9711 18.9455 10.7019 16.8302C9.4327 14.7148 9.4327 11.2852 10.7019 9.16984C11.9711 7.0545 14.0289 7.0545 15.2981 9.16984M8.66667 11.375H13M8.66667 14.625H13M22.75 13C22.75 18.3848 18.3848 22.75 13 22.75C7.61522 22.75 3.25 18.3848 3.25 13C3.25 7.61522 7.61522 3.25 13 3.25C18.3848 3.25 22.75 7.61522 22.75 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p className='eventPrice'>
              {eventprice(event.Price)}
            </p>
            <button className='buttonSignUp'>Sign Up</button>
          </div>
        </div>
      </div>

    

    {/* Bar der viser dato, location og forfatter */}
      <div className='descriptionBar'>
        <div className='EventDate'>

        <p className='EventMonth'>{eventmonth(event.DateAndTimeStart)}</p>
        <p className='EventDate'>{eventday(event.DateAndTimeStart)}</p>
        </div>

        <p className='EventTime'>{eventtimeStart(event.DateAndTimeStart)}-{eventTimeEnd(event.DateAndTimeEnd)}</p>
        
      {/* Location svg */}
        <svg className='LocationSVG' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.1283 18.0449C18.0858 19.0874 15.8744 21.2988 14.4129 22.7603C13.6319 23.5414 12.368 23.5412 11.587 22.7601C10.1507 21.3238 7.98349 19.1566 6.87178 18.0449C3.48724 14.6604 3.48724 9.17295 6.87178 5.78841C10.2563 2.40386 15.7438 2.40386 19.1283 5.78841C22.5128 9.17295 22.5128 14.6604 19.1283 18.0449Z" stroke="#19191A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.25 11.9167C16.25 13.7116 14.795 15.1667 13 15.1667C11.2051 15.1667 9.75004 13.7116 9.75004 11.9167C9.75004 10.1217 11.2051 8.66667 13 8.66667C14.795 8.66667 16.25 10.1217 16.25 11.9167Z" stroke="#19191A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        <p className='EventLocation'>{event.Location}</p>

{/* Svar for opretter */}
        <p className='EventCreator'>
          <svg className="UserSVG"width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3333 7.58333C17.3333 9.97657 15.3932 11.9167 13 11.9167C10.6067 11.9167 8.66663 9.97657 8.66663 7.58333C8.66663 5.1901 10.6067 3.25 13 3.25C15.3932 3.25 17.3333 5.1901 17.3333 7.58333Z" stroke="#19191A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13 15.1667C8.8118 15.1667 5.41663 18.5618 5.41663 22.75H20.5833C20.5833 18.5618 17.1881 15.1667 13 15.1667Z" stroke="#19191A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          By {event.Creator}
        </p>

      </div>


        <div className='description'>
          {event.Description}
        </div>

        <div className='comments'>
          <h3 className='commenttitle'>Comments</h3>
          {attendees.filter(attendee => attendee.ID === 2).map(attendee => (
            <div key={attendee.ID}>
              <p>{attendee.Name}</p>
              <p>{attendee.Dog}</p>
              <p>{attendee.Comments}</p>
              <TextField id="outlined-basic" label="Comment" variant="outlined" />
            </div>
          ))}
    
      </div>
    </div>
  );
};

export default Event;

