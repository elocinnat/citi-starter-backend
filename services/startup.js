let MySql = require('sync-mysql');

let dbhandler= require("../utility/dbUtility")

let insert = dbhandler.insert;
let executeQuery= dbhandler.executeQuery
let update = dbhandler.update
let select= dbhandler.select
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

function getStartByID(id){
    let query= select("startup","*", "startupID="+id.toString())
    return query[0]
}
function newstartup(data){ // the data should follow the ["startupName","industry","description"] format

    insert("startup",["startupName","industry","description","currentValuation"],data)//
}
function getStartupByName(startupName){
    let query= select("startup","*", "startupName= '"+startupName.toString()+"'")
    return query[0] //assume the nameis unique
}
function getStartupByIndustry(industry){
    let query= select("startup","*", "industry= '"+industry.toString()+"'")
    return query // return all the startup with this name 
}
function getAllstartup(){
    let query= select("startup","*")
    return query
}

//newstartup(["Applepen","technology","Make pen using apple"])
//console.log(getStartByID(1))
//console.log(getStartByName("ApplePen"))
//console.log(getStartupByIndustry("technology"))
exports.getAllstartup=getAllstartup
exports.getStartByID=getStartByID
exports.getStartupByIndustry=getStartupByIndustry
exports.getStartupByName=getStartupByName
exports.newstartup=newstartup