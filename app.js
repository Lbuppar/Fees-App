import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import favicon from 'express-favicon';
import mongoose from 'mongoose';
import { join } from 'path';
import connectDB from './db/connectDb.js';
import web from './routes/web.js';

const app = express();
const port = process.env.PORT || 9000;
const host = process.env.HOST || 'localhost';
const DATABASE_URL = process.env.DATABASE_URL;

// connecting database
mongoose.set('strictQuery', false)
connectDB(DATABASE_URL);

// url encoded
app.use(express.urlencoded({ extended: true }))

// static files
app.use("/", express.static(join(process.cwd(), "public")));

// ejs
app.set('views', './views');
app.set('view engine', 'ejs');


// Routing
app.use("/", web)

// serve-favicon
app.use(favicon(join(process.cwd(), 'public', 'favicon.ico')));


app.listen(port, host, () => {
    console.log(`Application Running at http://${host}:${port}`);
})




