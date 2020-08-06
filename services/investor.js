let MySql = require('sync-mysql');

let dbhandler= require("../utility/dbUtility");


let insert = dbhandler.insert;
let executeQuery= dbhandler.executeQuery
let update = dbhandler.update
let select= dbhandler.select
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
function getInvestorByID(investID){
    reply= select("investor","*","investorID = "+investID.toString())
    return reply[0]
}
function investedInStartup(InvestorID, startUpID, amount){
    // let date = new Date();
    insert("investment_log",["startupID","investorID","amount"],[startUpID, InvestorID,amount])
    update_investor_queries="update investor set investedAmt = investedAmt +" +amount.toString()+" where investorID ="+InvestorID.toString()
    executeQuery(update_investor_queries)
    update_startup_queries="update startup set fundsRaised= fundsRaised+" +amount.toString()+" where startupID ="+startUpID.toString()
    executeQuery(update_startup_queries)
}
function newInvestor(investorName, amountToInvest){
    
    insert("investor", ["investorName","sumAmt","investedAmt"],[investorName, amountToInvest,0])
}
function getAllInvestmentByInvestorId(investorID){
    queries=select("investment_log","*","investorID="+investorID.toString())
    return queries
}
//console.log(getAllInvestmentByInvestorId(160))
//newInvestor("Zhibobo",10000000)
//getInvestorByID(160)
//investedInStartup(158,3,-500)
exports.getAllInvestmentByInvestorId=getAllInvestmentByInvestorId
exports.getInvestorByID=getInvestorByID
exports.newInvestor=newInvestor
exports.investedInStartup=investedInStartup