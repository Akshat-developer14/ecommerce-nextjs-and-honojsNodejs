import { serve } from '@hono/node-server';
import { app } from './app.js';
import { connectDB } from './utils/dbConnect.js';
import dotenv from 'dotenv';
dotenv.config();


const port: number = Number(process.env.PORT) || 3001;

(async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    console.log(`Server is running on http://localhost:${port}`);

    serve({
      fetch: app.fetch,
      port
    });
  } catch (error: any) {
    console.error("Server error: ", error);
    process.exit(1);
  }
})();
