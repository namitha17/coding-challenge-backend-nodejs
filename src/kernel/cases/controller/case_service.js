const logger = require('../../../lib/logger');
const caseValidator = require('../controller/case_validator');

class CaseService{
  constructor({ caseDbOperations, bikeDbOperations, officerDbOperations }){
    this.caseDbOperations = caseDbOperations;
    this.bikeDbOperations = bikeDbOperations;
    this.officerDbOperations = officerDbOperations;
  }

  async resolveCaseById(caseId){
    try{
      //validate caseid to see if already resolved
      await caseValidator.validateCaseId(caseId);
      const resolvedCase = await this.caseDbOperations.searchCaseByFieldName('id', caseId);

      if(resolvedCase.length === 0){
        throw new Error(`Case with id ${caseId} not found`);
      }else if(resolvedCase[0].status === 'resolved'){
        throw new Error(`Case with id ${caseId} is already resolved`);
      }

      //update case and bike status as done
      await this.caseDbOperations.updateCaseDetails('id', caseId, {status: 'resolved'});
      await this.bikeDbOperations.updateBikeStatus(resolvedCase[0].bikeid, {status: 'found'});

      //check if any unassigned cases persists and assign to the unassigned officer
      const unassignedCase = await this.caseDbOperations.searchCaseByFieldName('status', 'unassigned');
      if(unassignedCase.length > 0){
          await this.caseDbOperations.updateCaseDetails('id', unassignedCase[0].id, {status: 'assigned', officerid: resolvedCase[0].officerid});
      }else{
        await this.officerDbOperations.updateOfficerStatus(resolvedCase[0].officerid, {status: 'unassigned'});
      }

      return {
        message: `Successfully marked case ${caseId} as resolved`,
        status: 200
      };
      
    }catch(err){
      logger.error(`Error while marking case as resolved: ${err.message}`);
      return({
        message: `Error while marking case as resolved: ${err.message}`,
        status: 400
      });
    }
  }
}

module.exports = CaseService;
