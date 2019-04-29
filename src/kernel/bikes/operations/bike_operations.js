const logger = require('../../../lib/logger');

class BikeOperations{
  constructor({ bikeService }) {
    this.bikeService = bikeService;
  }

  async handleStolenBikeReport(req, res, next){
    logger.info(`Incoming request for new stolen bike ${JSON.stringify(req.body)}`);
    res.json(await this.bikeService.reportNewStolenBke(req.body));
  }

  async handleBikeSearchWithProperties(req, res, next){
    res.json(await this.bikeService.searchBikeWithProperties(req.query));
  }
}

module.exports = BikeOperations;
