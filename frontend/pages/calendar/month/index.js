import CalendarGrid from '../../src/components/CalendarGrid'
export default function MonthPage(){
  const now = new Date()
  return <CalendarGrid year={now.getFullYear()} month={now.getMonth()+1} />
}
