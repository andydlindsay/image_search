const express = require('express'),
      router = express.Router(),
      request = require('superagent');

// latest search terms
router.get('/latest/imagesearch', (req, res) => {

});

// imagesearch with query and optional offset
router.get('/imagesearch/:query', (req, res) => {
    let query = req.params.query;
    const offset = req.query.offset;
    if (offset !== undefined) {
        query += '&offset=' + offset;
    }
    const urlString = 'https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=' + query;
    request
        .get(urlString)
        .set('Ocp-Apim-Subscription-Key', process.env.BING_API_KEY)
        .end((err, response) => {
            if (err || !response.ok) {
                console.error(err);
                res.json({ success: false, msg: 'Something went wrong.' });
            } else {
                let responseArray = [];
                for (let i = 0; i < response.body.value.length; i++) {
                    const newImage = {
                        'url': response.body.value[i].contentUrl,
                        'snippet': response.body.value[i].name,
                        'thumbnail': response.body.value[i].thumbnailUrl,
                        'context': response.body.value[i].hostPageDisplayUrl
                    }
                    responseArray.push(newImage);
                }
                res.json(responseArray);
            }
        });
});

// export router
module.exports = router;