var express = require('express');
var router = express.Router();

var investorController = require('../services/investor');
var startupController = require('../services/startup');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//returns list of startups
router.get('/startups', (req, res) => {
  let startups = startupController.getAllstartup()
  
  res.send(startups)
})

//returns one startup & its details
router.get('/startups/:startupID', (req, res) => {
  let startupID = req.params.startupID
  console.log("ID:" + startupID)
  let startup = startupController.getStartByID(startupID)
  console.log(startup)
  res.send(startup)
})

//returns success message that investment has been made
router.post('/startups/startup/invest', (req, res) => {
  let investorID = req.body.InvestorID
  let startupID = req.body.startupID 
  let amt = req.body.amt
  investorController.investedInStartup(investorID, startupID, amt)
  res.json({"status" : "success", "investorID" : investorID, "startupID" : startupID, "investAmount" : amt})
  
})


module.exports = router;
