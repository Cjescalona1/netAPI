var express = require("express");
const bodyParser = require('body-parser');
const needle = require('needle');
const commons = require('../commons'); 
 
var router = express.Router();
 
router.get("/", function(req, res, next){  
        const Q   = req.query.query
        const Q2  =  `from:${req.query.from}`
        const T  =  `${req.query.date1}`
        const T2  =  `${req.query.date2}`

    
        const params = {
        'query': `${Q} ${Q2} lang:es `,
         'expansions': 'author_id',  
        'max_results': 10, 
        'start_time':`${T}`, 
         'end_time':`${T2}`          
    }

    async function call(){
    const response = await  needle('get', commons.endpointUrl, params, {
            headers: {
                "User-Agent": "v2RecentSearchJS",
                "authorization": `Bearer ${commons.token}`
            }
        })
        if (response.body) { 
            console.log(response.body)
            res.send(response.body); 
        } else {
            throw new Error('Unsuccessful request');
        }
        } 
        call() 
})
module.exports = router; 