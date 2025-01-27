import { Hono } from 'hono'
import userRoute from './routes/user.route.js'
import { cors } from 'hono/cors'
import dotenv from 'dotenv'
dotenv.config()


export const app = new Hono()

app.use('/api/*', cors({
    origin: `${process.env.ALLOWED_ORIGIN}`,
    allowMethods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
}))

app.get('/test', (c) => c.text('Hello Hono!'))

app.route('/api/user', userRoute)