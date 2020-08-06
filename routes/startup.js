var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//returns list of startups
router.get('/startups', (req, res) => {
  res.send("startups page success")
})

//returns one startup & its details
router.get('/startups/:startupID', (req, res) => {
  res.send("individual startup success, " + req.params)
})

//returns success message that investment has been made
router.post('/startups/startup/invest', (req, res) => {
  res.send("invest success, " + req.body.startupID)
})


module.exports = router;
