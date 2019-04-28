class CaseService{
  constructor({ caseDbOperations, bikeDbOperations, officerDbOperations }){
    this.caseDbOperations = cases_db;
    this.bikeDbOperations = bike_db;
    this.officerDbOperations = officer_db;
  }

  async resolveCaseById(){

  }

}

module.exports = CaseService;
