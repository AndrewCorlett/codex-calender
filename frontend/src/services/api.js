const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
export default {
  async get(path){ const r = await fetch(`${API_URL}${path}`,{headers:{Authorization:localStorage.getItem('token')?'Bearer '+localStorage.getItem('token'):''}}); return r.json(); },
  async post(path,data){ const r = await fetch(`${API_URL}${path}`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+localStorage.getItem('token')},body:JSON.stringify(data)}); return r.json(); },
  async put(path,data){ const r = await fetch(`${API_URL}${path}`,{method:'PUT',headers:{'Content-Type':'application/json',Authorization:'Bearer '+localStorage.getItem('token')},body:JSON.stringify(data)}); return r.json(); }
}
