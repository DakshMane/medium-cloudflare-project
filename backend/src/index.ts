import { Hono } from 'hono'
import {PrismaClient} from  "./generated/prisma/client"
import {withAccelerate} from "@prisma/extension-accelerate"
import {verify , sign} from "hono/jwt"
import {userRouter} from './routes/user.route'
import blogRouter from "./routes/blog.route"
import {cors} from 'hono/cors'

const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
  }
}>()

app.use(
  '/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.use('/api/v1/blog/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') || '';

  if (!authHeader) {
    c.status(401);
    return c.json({ error: 'Unauthorized!!' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const response = await verify(token, 'Hello World', 'HS256');

    console.log('DECODED JWT:', response); // Should now print

    if (!response.userId) {
      c.status(403);
      return c.json({ error: 'Unauthorized!!' });
    }
    //@ts-ignore
    c.set('Id', Number(response.userId));
    return await next();
  } catch (error) {
    c.status(401);
    return c.json({ error: 'Invalid token' });
  }
});


app.route("/api/v1/user" , userRouter)


app.route("/api/v1/blog" , blogRouter)


export default app
