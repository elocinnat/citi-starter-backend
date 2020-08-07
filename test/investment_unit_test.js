
const chai = require("chai");
const startup= require("../services/startup");
const { newInvestor, getAllInvestor, getAllInvestmentByInvestorId, getInvestorByID, investedInStartup } = require("../services/investor");

const assert = chai.assert;

let getAllstartup= startup.getAllstartup
let getStartByID=startup.getStartByID
let getStartupByIndustry=startup.getStartupByIndustry
let getStartupByName=startup.getStartupByName
let newstartup=startup.newstartup

investedamt=-500
all_investments=getAllInvestmentByInvestorId(160)
all_investments_length=all_investments.length
current_startup= getStartByID(3)
current_investors= getInvestorByID(160)
investedInStartup(160,3,investedamt)

new_investment_log=getAllInvestmentByInvestorId(160)
new_investment_length= new_investment_log.length
new_startup= getStartByID(3)
new_investors=getInvestorByID(160)
describe('Investment Test', () => {
    it('new investment log test', () => {  

        assert.equal(all_investments_length+1 ,new_investment_length)
    }) 
    it("check the new investment is presence", function(){
        let isPresent=false
        for(let i=0 ; i< new_investment_length;i++){
            entry= new_investment_log[i]
            if(entry["investmentID"]=160&&entry["startupID"]==1&& entry["amount"]==investedamt){
                isPresent=true
            }
        }
        assert.isTrue(isPresent)
    })
    it('checkinvestedamt', () => {  
        previous_invested_amt= current_investors["investedAmt"]
        previous_startup_investment=current_startup["fundsRaised"]

        new_invested_amt= new_investors["investedAmt"]
        new_startup_amt=new_startup["fundsRaised"]
        //assert.equal(previous_invested_amt+investedamt,new_invested_amt)
        assert.equal(previous_startup_investment+investedamt, new_startup_amt)
       
    }) 
})