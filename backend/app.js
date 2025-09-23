const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const mongoConnect = require('./db/connect')
mongoConnect();

const PORT = process.env.PORT || 4000
app.listen(PORT , ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})