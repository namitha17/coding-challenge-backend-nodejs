const logger = require('../../../lib/logger');
const bikeValidator = require('../controller/bike_validator');

class BikeService{
  constructor({ bikeDbOperations, officerDbOperations, caseDbOperations }){
    this.bikeDbOperations = bikeDbOperations;
    this.officerDbOperations = officerDbOperations;
    this.caseDbOperations = caseDbOperations;
  }

  async reportNewStolenBke(bikeDetails){
    try{
      //validate bike info and see if it already exists with the license no
      const bikeInfo = bikeValidator.validateBikeInfo(bikeDetails);
      const thisBikeExists = await this.bikeDbOperations.searchBikeWithLicenseNo(bikeInfo.licenseno);

      //if bike doesnt exist then create it, create a case for it and assign a free officer to the case
      if(thisBikeExists.length === 0){
        const newBike = await this.bikeDbOperations.insertNewBike(bikeInfo);
        const unassignedOfficer = await this.officerDbOperations.searchUassignedOfficer();
        let newCase;

        if(unassignedOfficer.length > 0){
          await this.officerDbOperations.updateOfficerStatus(unassignedOfficer[0].id, {status: 'assigned'});
          newCase = await this.caseDbOperations.insertNewCase(newBike[0], unassignedOfficer[0].id, 'assigned');
        }else{
          newCase = await this.caseDbOperations.insertNewCase(newBike[0], null, 'unassigned');
        }

        logger.info(`New stolen bike case created with case id: ${newCase[0]}`);
        return {
          message: `A new case has been created for the stolen bike`,
          bikeid: newBike[0],
          caseid: newCase[0],
          status: 200
        };

      }else{
        throw new Error(`A case for bike with licenseno ${bikeInfo.licenseno} already exists`)
      }

    }catch(err){
      logger.error(`Error while reporting new bike: ${err.message}`);
      return({
        message: err.message,
        status: 400
      });
    }
  }

  searchBikeWithProperties(bikeProperties){
    try{
      return this.bikeDbOperations.searchBike(bikeProperties);
    }catch(err){
      logger.error(`Error while searching for bikes: ${err.message}`);
      return({
        message: err.message,
        status: 400
      });
    }
  }
}

module.exports = BikeService;
