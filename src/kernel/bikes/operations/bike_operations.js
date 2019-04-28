class BikeOperations{
  constructor({ bikeService }) {
    this.bikeService = bikeService;
  }

  async handleStolenBikeReport(req, res, next){
    res.json({});
  }

  async handleBikeSearchWithProperties(req, res, next){

  }

  async handleBikeSearchWithId(req, res, next){

  }
}

module.exports = BikeOperations;
