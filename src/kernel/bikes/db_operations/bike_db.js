class BikeDbOperations{
  constructor({ knexConn }) {
      this.knexConn = knexConn;
  }

  insert(bikeInfo){
    //search for bike with license number, if not found then insert
    const thisBikeExists = this.knexConn('bikes').select('*').where('licenseno', bikeInfo.licenseno);
    if(thisBikeExists.length === 0){
      return this.knexConn('bikes').insert(bikeInfo);
    }else{
      throw new Error(`Stolen bike report for license number ${bikeInfo.licenseno} already exists`);
    }
  }
}

module.exports = BikeDbOperations;
