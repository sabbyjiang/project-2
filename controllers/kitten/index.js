const router = require('express').Router();
const unirest = require('unirest');

router.get('/', (req, res) => {
    unirest.get("https://nijikokun-random-cats.p.mashape.com/random/kitten")
        .header("X-Mashape-Key", process.env.SPOONACULAR_API_KEY)
        // API key is the same as the one for kitten
        .header("Accept", "application/json")
        .end((result) => {
            res.json(result);
        });

});

module.exports = router;