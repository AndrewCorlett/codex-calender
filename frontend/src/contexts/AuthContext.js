import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({children}){
  const [user,setUser]=useState(null)
  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token) api.get('/users').then(()=>setUser({}))
  },[])
  const login=async(email,password)=>{const res=await api.post('/auth/login',{email,password});localStorage.setItem('token',res.token);setUser(res.user)}
  const value={user,login}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
