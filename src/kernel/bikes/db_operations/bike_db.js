class BikeDbOperations{
  constructor({ knexConn }) {
      this.knexConn = knexConn;
  }

  insertNewBike(bikeInfo){
    return this.knexConn('bikes').insert(bikeInfo);
  }

  searchBike(bikeProperties){
    return this.knexConn('bikes')
          .select('bikes.*')
          .select({
            'officername': 'officers.officername',
            'officerid': 'officers.id',
            'officerstatus':  'officers.status',
            'casesid': 'cases.id',
            'casesstatus': 'cases.status'
          })
          .where(qb => {
            Object.entries(bikeProperties).forEach(([key, value]) => {
              if(key === "description"){
                qb.where(`bikes.${key}`, 'like', `%${value}%`);
              }else{
                qb.where(`bikes.${key}`, '=', value);
              }
            });
          })
          .leftJoin('cases', 'cases.bikeid', 'bikes.id')
          .leftJoin('officers', 'officers.id', 'cases.officerid')
          .orderBy('bikes.id', 'asc');
  }

  searchBikeWithLicenseNo(licenseno){
    return this.knexConn('bikes').select('id').where('licenseno', licenseno);
  }

  updateBikeStatus(bikeId, updateFields){
    return this.knexConn('bikes').where('id', bikeId).update(updateFields);
  }
}

module.exports = BikeDbOperations;
