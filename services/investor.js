let MySql = require('sync-mysql');

let dbhandler= require("../utility/dbUtility");

let insert = dbhandler.insert;
let executeQuery= dbhandler.executeQuery
let update = dbhandler.update
let select= dbhandler.select
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};
function getInvestorByID(investID){
    reply= select("investor","*","investorID = "+investID.toString())
    return reply[0]
}
function investedInStartup(InvestorID, startUpID, amount){
    insert("investment_log",["startupID","investorID","amount"],[startUpID, InvestorID,amount])
    update_investor_queries="update investor set investedAmt = investedAmt +" +amount.toString()+" where investorID ="+InvestorID.toString()
    executeQuery(update_investor_queries)
    update_startup_queries="update startup set fundsRaised= fundsRaised+" +amount.toString()+" where startupID ="+startUpID.toString()
    executeQuery(update_startup_queries)
    insert("investment_log",["startupID","investorID","amount"],[startUpID, InvestorID,amount])
}
function newInvestor(investorName, amountToInvest){
    insert("investor", ["investorName","sumAmt","investedAmt"],[investorName, amountToInvest,0])
}
newInvestor("Zhibobo",10000000)
//getInvestorByID(160)
//investedInStartup(160,3,-500)