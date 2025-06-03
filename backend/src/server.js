const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({error: 'No token'});
  const token = header.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch(e) { res.status(401).json({error:'Invalid token'}); }
}

function roleMiddleware(roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).end();
    const has = req.user.roles.some(r => roles.includes(r));
    if (!has) return res.status(403).end();
    next();
  };
}

app.post('/api/auth/signup', async (req,res)=>{
  const {name,email,password} = req.body;
  const hash = await bcrypt.hash(password,10);
  const user = await prisma.user.create({data:{name,email,passwordHash:hash,roles:{set:['AO']}}});
  res.json(user);
});

app.post('/api/auth/login', async (req,res)=>{
  const {email,password} = req.body;
  const user = await prisma.user.findUnique({where:{email}});
  if(!user) return res.status(401).end();
  const ok = await bcrypt.compare(password,user.passwordHash);
  if(!ok) return res.status(401).end();
  const token = jwt.sign({id:user.id,roles:user.roles},process.env.JWT_SECRET);
  res.json({token,user});
});

app.get('/api/users', authMiddleware, roleMiddleware(['ADMIN']), async (req,res)=>{
  const users = await prisma.user.findMany();
  res.json(users);
});

app.patch('/api/users/:id/roles', authMiddleware, roleMiddleware(['ADMIN']), async (req,res)=>{
  const {roles} = req.body;
  const user = await prisma.user.update({where:{id:req.params.id}, data:{roles}});
  res.json(user);
});

app.get('/api/events', authMiddleware, async (req,res)=>{
  const events = await prisma.event.findMany({include:{tags:true}});
  res.json(events);
});

app.get('/api/events/:id', authMiddleware, async (req,res)=>{
  const event = await prisma.event.findUnique({where:{id:req.params.id},include:{tags:true}});
  res.json(event);
});

app.post('/api/events', authMiddleware, roleMiddleware(['LO','ADMIN']), async (req,res)=>{
  const data = req.body;
  data.createdById = req.user.id;
  const event = await prisma.event.create({data});
  res.json(event);
});

app.put('/api/events/:id', authMiddleware, roleMiddleware(['LO','ADMIN']), async (req,res)=>{
  const event = await prisma.event.update({where:{id:req.params.id},data:req.body});
  res.json(event);
});

app.delete('/api/events/:id', authMiddleware, roleMiddleware(['LO','ADMIN']), async (req,res)=>{
  await prisma.event.delete({where:{id:req.params.id}});
  res.json({status:'deleted'});
});

app.post('/api/events/:id/tags', authMiddleware, roleMiddleware(['LO','ADMIN']), async (req,res)=>{
  const {userIds} = req.body;
  const create = userIds.map(u=> ({userId:u,eventId:req.params.id}));
  await prisma.eventTag.createMany({data:create});
  const tags = await prisma.eventTag.findMany({where:{eventId:req.params.id}});
  res.json(tags);
});

app.patch('/api/events/:id/tags/:userId/availability', authMiddleware, async (req,res)=>{
  if(req.user.id!==req.params.userId && !req.user.roles.includes('LO') && !req.user.roles.includes('ADMIN')) return res.status(403).end();
  const tag = await prisma.eventTag.updateMany({where:{eventId:req.params.id,userId:req.params.userId}, data:{availability:req.body.availability}});
  res.json(tag);
});

app.patch('/api/events/:id/tags/:userId/payment', authMiddleware, async (req,res)=>{
  if(req.user.id!==req.params.userId && !req.user.roles.includes('LO') && !req.user.roles.includes('ADMIN')) return res.status(403).end();
  const tag = await prisma.eventTag.updateMany({where:{eventId:req.params.id,userId:req.params.userId}, data:{paymentStatus:req.body.paymentStatus}});
  res.json(tag);
});

app.listen(3001,()=>console.log('Server running on 3001'));
