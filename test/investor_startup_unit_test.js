const chai = require("chai");
const startup= require("../services/startup");
const { newInvestor, getAllInvestor, getAllInvestmentByInvestorId, getInvestorByID, investedInStartup } = require("../services/investor");

const assert = chai.assert;

let getAllstartup= startup.getAllstartup
let getStartByID=startup.getStartByID
let getStartupByIndustry=startup.getStartupByIndustry
let getStartupByName=startup.getStartupByName
let newstartup=startup.newstartup


// For Test 1
all_startup= getAllstartup()
console.log(all_startup.length)
current_length=all_startup.length
newstartup(["test_startup","technology","description",5000])
new_all_startup=getAllstartup()
new_length=new_all_startup.length

describe('Test Startup Entry', () => {
    it('Add new Start Up ', () => {  

        assert.equal(current_length+1 , new_length)
    }) 
    it("check the startup is inserted", function(){
        let isPresent=false
        for(let i=0; i< new_length;i++){
            entry= new_all_startup[i]
            if (entry["startupName"]=="test_startup"){
                isPresent=true
            }
        }
        assert.isTrue(isPresent)
    })
})

current_investors=getAllInvestor()
current_length=current_investors.length
investamnt=10000
newInvestor("testing_investor",investamnt)
new_investors= getAllInvestor()
new_length= new_investors.length
describe('Investor Test', () => {
    it('new Investor', () => {  

        assert.equal(current_length+1 , new_length)
    }) 
    it("check the startup is inserted", function(){
        let isPresent=false
        for(let i=0 ; i< new_length;i++){
            entry= new_investors[i]
            if (entry["investorName"]=="testing_investor"){
                isPresent=true
            }
        }
        assert.isTrue(isPresent)
    })
})
