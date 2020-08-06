var express = require('express');
var router = express.Router();

// Require controller modules.
var investorController = require('../services/investor');
var startupController = require('../services/startup');

// router.get('/book/:id/delete', book_controller.book_delete_get);
router.get('/startups', startupController.getAllstartup);

router.get('/startups/:startupID', startupController.getStartByID);

module.exports = router;