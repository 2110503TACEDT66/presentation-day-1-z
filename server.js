const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config({path:'./config/config.env'});

connectDB();

const hospitals = require(`./routes/companies`);
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(`/api/v1/companies` ,hospitals);
app.use('/api/v1/auth',auth);
app.use('/api/v1/bookings',bookings);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, 'mode on port' , PORT));

process.on('unhandleRejection' , (err,promise)=>{
    console.log(`Error: ${err.message}`);
    server.close(()=> process.exit(1));
});
