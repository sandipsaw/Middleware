const express = require('express');

const router = express.Router();

router.use((req,res,next)=>{
    console.log("This middileware is between router and api");
    next()
})

router.get('/',(req,res)=>{
    res.json({message:"welcome to the cohort"})
})

module.exports = router