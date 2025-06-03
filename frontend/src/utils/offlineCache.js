export function saveEvents(key,data){
  if(typeof indexedDB==='undefined') return;
  const req = indexedDB.open('calendar',1);
  req.onupgradeneeded = ()=>{req.result.createObjectStore('events')};
  req.onsuccess=()=>{const db=req.result;const tx=db.transaction('events','readwrite');tx.objectStore('events').put(data,key)}
}
export function loadEvents(key,cb){
  const req=indexedDB.open('calendar',1);
  req.onsuccess=()=>{const db=req.result;const tx=db.transaction('events');const get=tx.objectStore('events').get(key);get.onsuccess=()=>cb(get.result)}
}
