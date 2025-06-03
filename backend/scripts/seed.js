const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const prisma = new PrismaClient();
async function main(){
  const hash = await bcrypt.hash('adminpass',10);
  await prisma.user.create({data:{name:'Admin',email:'admin@example.com',passwordHash:hash,roles:['ADMIN']}});
}
main().catch(e=>console.error(e)).finally(()=>prisma.$disconnect());
