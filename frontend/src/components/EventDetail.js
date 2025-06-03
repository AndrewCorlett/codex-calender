import { useEffect, useState } from 'react'
import api from '../services/api'
export default function EventDetail({id}){
 const [event,setEvent] = useState(null)
 useEffect(()=>{api.get(`/events/${id}`).then(setEvent)},[id])
 if(!event) return <div>Loading...</div>
 return <div>
  <h2>{event.title}</h2>
  <p>{event.description}</p>
  <p>{new Date(event.startDateTime).toLocaleString()} - {new Date(event.endDateTime).toLocaleString()}</p>
 </div>
}
