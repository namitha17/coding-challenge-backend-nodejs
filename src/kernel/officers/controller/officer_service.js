const logger = require('../../../lib/logger');
const officerValidator = require('../controller/officer_validator');

class OfficerService{
  constructor({ officerDbOperations, bikeDbOperations, caseDbOperations }){
    this.officerDbOperations = officerDbOperations;
    this.bikeDbOperations = bikeDbOperations;
    this.caseDbOperations = caseDbOperations;
  }

  async addNewOfficer(officerDetails){
    try{
      //validate and add officer if not already present with officerid -- like a badge id (not the id column in the db)
      const officerInfo = officerValidator.validateOfficerInfo(officerDetails);
      const thisOfficerExists = await this.officerDbOperations.searchOfficerByFieldName('officerid', officerInfo.officerid);

      //add officer and assign to any avialable case
      if(thisOfficerExists.length === 0){
        const newOfficer = await this.officerDbOperations.insertNewOfficer(officerInfo);
        const unassignedCase = await this.caseDbOperations.searchCaseByFieldName('status', 'unassigned');
        if(unassignedCase.length > 0){
            await this.caseDbOperations.updateCaseDetails('id', unassignedCase[0].id, {status: 'assigned', officerid: newOfficer[0]});
        }

        logger.info(`New officer has been added with id: ${newOfficer[0]}`);
        return {
          message: `New officer has been added`,
          officerid: newOfficer[0],
          assignedcaseid: (unassignedCase.length > 0 ? unassignedCase[0].id : ''),
          status: 200
        };
      }else{
        throw new Error(`Officer with officer id ${officerInfo.officerid} already exists`)
      }

    }catch(err){
      logger.error(`Error while adding new officer: ${err.message}`);
      return({
        message: err.message,
        status: 400
      });
    }
  }

  async removeOfficer(officerId){
    try{
      //validate officer id, reassign case to backup officer and then delete
      await officerValidator.validateOfficerId(officerId);
      const officerToRemove = await this.officerDbOperations.searchOfficerByFieldName('id', officerId);

      if(officerToRemove.length === 0){
        throw new Error(`Officer with id ${officerId} not found or is already removed!`);

      }else if(officerToRemove[0].status === 'assigned'){
        const unassignedOfficer = await this.officerDbOperations.searchOfficerByFieldName('status', 'unassigned');
        if(unassignedOfficer.length === 0){
          throw new Error(`Officer with id ${officerId} is assigned to an ongoing case with no other officer as backup. They cannot be removed at this point!`);
        }
        await this.caseDbOperations.updateCaseDetails('officerid', officerId, {officerid: unassignedOfficer[0].id});
      }

      await this.officerDbOperations.deleteOfficer(officerId);
      logger.info(`Successfully deleted officer`);
      return {
        message: `Successfully deleted officer`,
        status: 200
      };
    }catch(err){
      logger.error(`Error while removing officer: ${err.message}`);
      return({
        message: err.message,
        status: 400
      });
    }
  }
}

module.exports = OfficerService;
