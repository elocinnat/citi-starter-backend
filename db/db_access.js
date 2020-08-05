let MySql = require('sync-mysql');
let enviro= require('../environments/environment.js');

let dbhandler= require("../utility/dbUtility.js")
let insert = dbhandler.insert;
let executeQuery= dbhandler.executeQuery
let update = dbhandler.update
let select= dbhandler.select


Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

console.log("env.environment.db", enviro.environment);

