const bodyParser = require('body-parser');
const commons = require('../commons'); 
var express = require("express");
const needle = require('needle');
var router = express.Router();
 
router.post("/", function(req, res, next){ 
    //res.send(req.query) 
        let Q  = req.query.query
        const params = { 
         'query': `${Q} lang:es -is:retweet -has:links -is:reply`,
         'expansions': 'author_id',
         'max_results': 100,  
         // [author_id,referenced_tweets.id,referenced_tweets.id.author_id,entities.mentions.username,attachments.poll_ids,attachments.media_keys,in_reply_to_user_id,geo.place_id]
        //'expansions': 'geo.place_id',
        //'place.fields': 'name',
        //'place.fields':'country',
        //[query,start_time,end_time,since_id,until_id,max_results,next_token,expansions,tweet.fields,media.fields,poll.fields,place.fields,user.fields]
        //start_time 
        //end_time
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