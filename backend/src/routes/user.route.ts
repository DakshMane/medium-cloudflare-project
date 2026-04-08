import { Hono } from 'hono';
import { Bindings } from 'hono/types';
import { PrismaClient } from '../generated/prisma/client';
import {sign, verify} from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate';
import { userSchema } from '@daksh_mane/common';



export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();




userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const { name, email, password } = await c.req.json();

  const { success } = userSchema.safeParse({name , email  , password })

  if (!success) return c.json({ message: 'Invalid input data' });


  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  const token = await sign({ userId: user.id, email: user.email }, 'Hello World' , 'HS256');

  return c.json({ user, token });
});

userRouter.post('/signin', async (c) => {
  const { email, password } = await c.req.json();
  const { success } = userSchema.safeParse({ email, password });
  if (!success) return c.json({ message: 'Invalid input data' });

  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: 'User not found !!' });
  }

  const token = await sign({ userId: user.id, email: user.email }, 'Hello World' , 'HS256');

  return c.json({ token });
});

userRouter.get('/profile', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    c.status(401);
    return c.json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = await verify(token, 'Hello World' , 'HS256') as { userId: number, email: string };
    const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
      select : {
        name : true ,
        id : true ,
        email : true

      }
    });
    if (!user) {
      c.status(404);
      return c.json({ error: 'User not found' });
    }

    c.status(201)

    return c.json({ user });
  } catch (error) {
    c.status(401);
    return c.json({ error: 'Invalid token' });
  }
});


