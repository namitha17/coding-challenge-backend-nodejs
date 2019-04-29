class OfficerDBOperations{
  constructor({ knexConn }) {
      this.knexConn = knexConn;
  }

  searchUassignedOfficer(){
    return this.knexConn('officers').select('id').where('status', 'unassigned').orderBy('id', 'desc');
  }

  updateOfficerStatus(officerId, updateFields){
    return this.knexConn('officers').where('id', officerId).update(updateFields);
  }
}

module.exports = OfficerDBOperations;
