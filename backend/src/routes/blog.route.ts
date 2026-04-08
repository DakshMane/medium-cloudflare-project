import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import z from 'zod'
import {blogSchema} from "@daksh_mane/common"
const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
  }
  Variables : {
    Id : number
  }
}>()

app.use('*', async (c, next) => {
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

app.post("/" , async  (c) => {

  console.log('ALL CONTEXT VARS:', c.get('Id'));
  console.log('ALL HEADERS:', c.req.header('Authorization'));

  const prisma = new PrismaClient({accelerateUrl : c.env.DATABASE_URL}).$extends(withAccelerate()) ;

  const { title, content  } = await c.req.json() ;

  const { success } = blogSchema.safeParse({title , content})
  if (!success) return c.json({message : "Send the details properly !! "})
  const blog = await prisma.post.create({
    data : {
      title : title ,
      content : content ,
      authorId : c.get('Id')  ,
      publishedDate : new Date()

    }
  })

  if (!blog) {
    c.status(403)
    return c.json({message : "Failed to upload the blog "})
  }

  c.status(201)
  return c.json({ blog })
})

app.delete("/:id" , async (c ) => {
  const blogId = c.req.param('id');

  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const blogRemove = await prisma.post.delete({
    where: {
      id: Number(blogId),
    },
  });

  if (!blogRemove) return c.json({ message: 'Failed to delete the blog ' });

  return c.json({ message: 'Successfully removed the blog ' });
})

app.put("/:id" , async (c) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const blogId = c.req.param('id');
  const { title, content } = await c.req.json();

  if (!title && !content) return c.json({ message: 'At least send one ' });

  const blogUpdate = await prisma.post.update({
    where: {
      id: Number(blogId),
    },
    data: {
      title: title,
      content: content,
    },
  });

  if (!blogUpdate) return c.json({ message: 'Failed to update !!' });

  return c.json({ message: 'Successfully updated the blog', blog: blogUpdate });
})


app.get("/bulk" , async (c) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany({
    select : {
      author : {
        select : {
          name : true
        }
      }
      ,
      title : true ,
      content : true ,
      id : true
    }
  });

  return c.json({ blogs  : blogs });
})

app.get("/:id" , async (c ) => {
  const prisma = new PrismaClient({ accelerateUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
  const blogId = c.req.param('id');
  const blog = await prisma.post.findFirst({ where: { id: Number(blogId) } , select : {
    title : true ,
    content: true ,
    publishedDate : true ,

    author : {
      select : {
        name : true
      }
    }
  } });

  if (!blog) return c.json({ message: 'Failed to get the blog' });

  return c.json({ blog });
})

export default app ;
