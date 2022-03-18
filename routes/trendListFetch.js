var express = require("express");
const bodyParser = require('body-parser');
const needle = require('needle');
const commons = require('../commons'); 
 
var router = express.Router();
var testURL ='https://api.twitter.com/1.1/trends/place.json'; 
var ava ='https://api.twitter.com/1.1/trends/available.json'; 
router.get("/", function(req, res, next){
        const id   = req.query.id
    
        const params = {
            'id':id,
    }

    async function call(){
        //const response = await  needle('get', commons.countryIDurl, params, {
            const response = await  needle('get', testURL,params,{
            headers: {
                "User-Agent": "v2RecentSearchJS",
                "authorization": `Bearer ${commons.token}`
            }
        })
        if (response.body) { 
            res.send(response.body); 
        } else {
            throw new Error('Unsuccessful request');
        }
        } 
        call() 
})
module.exports = router; 