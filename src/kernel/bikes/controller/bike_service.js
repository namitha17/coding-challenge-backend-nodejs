const logger = require('../../../lib/logger');
const bikeValidator = require('../operations/bike_validator');

class BikeService{
  constructor({ bikeDbOperations, officerDbOperations, caseDbOperations }){
    this.bikeDbOperations = bikeDbOperations;
    this.officerDbOperations = officerDbOperations;
    this.caseDbOperations = caseDbOperations;
  }

  async reportNewStolenBke(bikeInfo){
    try{
      const bike = await this.bikeDbOperations.insert((bikeValidator.validateBikeInfo(bikeInfo)));
      // const uassignedOfficer = await this.officerDbOperations.searchUassignedOfficer();
      //
      // if(uassignedOfficer.length > 0){
      //
      // }

      return bike;
    }catch(err){
      return({
        message: err.message,
        status: 400
      });
    }
  }

  searchBikeWithProperties(){
    try{

    }catch(err){

    }
  }

  searchBikeById(){
    try{

    }catch(err){

    }
  }
}

module.exports = BikeService;
