import { Comment, Start, Title } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/StylingEvent.css';


const attendees = [
  { ID: 1, Name: "Mogens Mogensen", Dog: "Charlie", Comments: "Hej alle sammen. Jeg glæder mig til at se jer til hundetræning i morgen. Charlie og jeg har trænet indkald hele ugen, så vi er klar til at vise jer vores fremskridt. Vi har også øvet os på at gå pænt i snor, så vi er klar til at tage udfordringen op. Vi ses i morgen!" },
  { ID: 2, Name: "Julie Nielsen", Dog: "Hannibal", Comments: "Mega fedt initiativ! Hannibal og jeg ser altid frem til den månedlige hundetræning. Hvis der er nogle nye med til denne måneds træning, så vil jeg lige videregive et tip. Da det godt kan blive lidt køligt, så er min erfaring, at Hannibal kan koncentrere sig om træning i længere tid, hvis vi har et lille tæppe med, hun kan sidde på / putte sig i :)Vi glæder os til at se jer i hundeskoven!" },  
  { ID: 3, Name: "Freja Sunesen", Dog: "Konrad", Comments:"Hej alle sammen. Konrad og jeg glæder os til at se jer i morgen. Vi har trænet indkald og gå pænt i snor, så vi er klar til at tage udfordringen op. Vi ses i morgen!" },
];


const event = {id:1,
  Title:"Hundetræning i hundeskoven",
  Description:"Glæd jer til månedens hundetræning i Brøndby Hundeskov. Denne måneds fokus kommer til at være socialisering og lydighedstræning. Vi vil arbejde indkald og gå pænt i snor. Alle hunde er velkomne uanset erfaring og niveau. Husk at medbringe godbidder, vand og masser af energi! Vi glæder os til at se jer til en sjov og lærerig dag i hundeskoven.",
  DateAndTimeStart:"2024-12-11T10:00:00",
  DateAndTimeEnd:"2022-12-11T12:00:00"
  ,Location:"Brøndby Hundeskov",
  Creator:"Mogens Mogensen",
  Price: 0,
Image:"https://assets.nintendo.eu/image/upload/f_auto/q_auto/v1674436794/NAL/Articles/Get%20to%20know%20Link%20and%20his%20many%20adventures/hero.jpg"} ;

function eventprice (price:number){
  if(price === 0){
    return "Free"
  }
  else{
    return price + " DKK"
  }
}

function eventmonth (date:string){
  const month = new Date(date).getMonth();
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return months[month];
}

function eventday (date:string){
  const day = new Date(date).getDate();
  return day;
}

function eventtimeStart (date:string){
  const time = new Date(date).getHours();
  return time;
}
function eventTimeEnd (date:string){
  const time = new Date(date).getHours();
  return time;
}

const Event = () => {
  return (
    
    <div>
      <div className='titleBar'>

      <img className='pictureEvent' src={event.Image} alt="" />
      <div className='underBar'>
      <h1 className='EventTitle'>{event.Title}</h1>
      <p className='eventPrice'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
  <path d="M15.2981 16.8302C14.0289 18.9455 11.9711 18.9455 10.7019 16.8302C9.4327 14.7148 9.4327 11.2852 10.7019 9.16984C11.9711 7.0545 14.0289 7.0545 15.2981 9.16984M8.66667 11.375H13M8.66667 14.625H13M22.75 13C22.75 18.3848 18.3848 22.75 13 22.75C7.61522 22.75 3.25 18.3848 3.25 13C3.25 7.61522 7.61522 3.25 13 3.25C18.3848 3.25 22.75 7.61522 22.75 13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>  {eventprice(event.Price)} </p>
      <button className='buttonSignUp'>Sign Up</button>
      </div>
      </div>
      <div className='descriptionBar'>
      <p>{eventmonth(event.DateAndTimeStart)}</p>
<p>{eventday(event.DateAndTimeStart)}</p>
<p>{eventtimeStart(event.DateAndTimeStart)}-{eventTimeEnd(event.DateAndTimeEnd)}</p>
<p>{event.Location}</p>

{/* Logo for creator */}
<p><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3333 7.58333C17.3333 9.97657 15.3932 11.9167 13 11.9167C10.6067 11.9167 8.66663 9.97657 8.66663 7.58333C8.66663 5.1901 10.6067 3.25 13 3.25C15.3932 3.25 17.3333 5.1901 17.3333 7.58333Z" stroke="#19191A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 15.1667C8.8118 15.1667 5.41663 18.5618 5.41663 22.75H20.5833C20.5833 18.5618 17.1881 15.1667 13 15.1667Z" stroke="#19191A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
{event.Creator}</p>


<div className='description'> 
  {event.Description}
  </div>

  <div className='comments'>

<h3>Comments</h3>
  {attendees.filter(attendee => attendee.ID === 2).map(attendee => (
    <div key={attendee.ID}>
      <p>{attendee.Name}</p>
      <p>{attendee.Dog}</p>
      <p>{attendee.Comments}</p>
      <TextField id="outlined-basic" label="Comment" variant="outlined" />
    </div>
  ))}

  </div>

  

      </div >
  
    </div>
    
  );
}

export default Event;
