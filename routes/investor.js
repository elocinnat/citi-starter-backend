var express = require('express');
var router = express.Router();

//returns investor's investments 
router.get('/:investorID/investments', (req, res) => {
  res.send("investor's investments success, " + req.params)
})

module.exports = router;
