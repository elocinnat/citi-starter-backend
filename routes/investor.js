var express = require('express');
var router = express.Router();

var investorController = require('../services/investor');

//returns investor's investments 
router.get('/:investorID/investments', (req, res) => {
  let investorID = req.params.investorID
  let investments = investorController.getAllInvestmentByInvestorId(investorID)
  res.send(investments)
})

module.exports = router;
