class CaseOperations{
    constructor({ caseService }) {
        this.caseService = caseService;
    }

    async handleMarkCaseAsResolved(req, res, next){
      logger.info(`Incoming request to mark case id ${req.params.id} as resolved`);
      res.json(await this.caseService.resolveCaseById(req.params.id));
    }
}

module.exports = CaseOperations;
