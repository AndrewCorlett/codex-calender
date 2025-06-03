import Link from 'next/link'
import { useEffect, useState } from 'react'
import api from '../services/api'

export default function CalendarGrid({year,month}){
  const [events,setEvents] = useState([])
  useEffect(()=>{
    api.get('/events').then(r=>setEvents(r))
  },[])
  const days = new Date(year, month, 0).getDate()
  const cells = []
  for(let i=1;i<=days;i++){
    const dayEvents = events.filter(e=>new Date(e.startDateTime).getDate()===i)
    cells.push(
      <div key={i} className="day">
        <Link href={`/calendar/day/${year}-${month.toString().padStart(2,'0')}-${i.toString().padStart(2,'0')}`}>{i}</Link>
        {dayEvents.slice(0,2).map(ev=>
          <div key={ev.id} className="pill" style={{background:ev.calendarColor}}>{ev.title}</div>
        )}
        {dayEvents.length>2 && <div>+{dayEvents.length-2} more</div>}
      </div>
    )
  }
  return <div className="grid">{cells}</div>
}
