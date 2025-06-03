import { useRouter } from 'next/router'
import DayTimeline from '../../src/components/DayTimeline'
export default function DayPage(){
 const router = useRouter();
 const { date } = router.query;
 if(!date) return null;
 return <DayTimeline date={date} />
}
