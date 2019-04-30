const logger = require('../../../lib/logger');

class OfficerOperations{
    constructor({ officerService }) {
        this.officerService = officerService;
    }

    async handleAddNewOfficer(req, res, next){
      logger.info(`Incoming request to add new officer ${JSON.stringify(req.body)}`);
      res.json(await this.officerService.addNewOfficer(req.body));
    }

    async handleRemoveOfficer(req, res, next){
      logger.info(`Incoming request to remove officer with id ${req.params.id}`);
      res.json(await this.officerService.removeOfficer(req.params.id));
    }
}

module.exports = OfficerOperations;
