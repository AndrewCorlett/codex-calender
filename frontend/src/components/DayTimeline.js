import { useEffect, useState } from 'react'
import api from '../services/api'
export default function DayTimeline({date}){
  const [events,setEvents] = useState([])
  useEffect(()=>{
    api.get('/events').then(r=>{
      setEvents(r.filter(e=>e.startDateTime.startsWith(date)))
    })
  },[date])
  return <div>{events.map(e=> <div key={e.id} style={{background:e.calendarColor}}>{e.title}</div>)}</div>
}
