const express = require('express');
const indexRoutes = require('./routes/index.route')

const app = express();
app.use(express.json())

app.use((req,res,next)=>{
    console.log("This middileware is between app and router");
    next()
})

app.use('/',indexRoutes)
module.exports = app