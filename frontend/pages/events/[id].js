import { useRouter } from 'next/router'
import EventDetail from '../src/components/EventDetail'
export default function EventPage(){
 const router = useRouter();
 const { id } = router.query;
 if(!id) return null;
 return <EventDetail id={id} />
}
