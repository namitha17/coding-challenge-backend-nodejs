class OfficerDBOperations{
  constructor({ knexConn }) {
      this.knexConn = knexConn;
  }

  insertNewOfficer(officerInfo){
    return this.knexConn('officers').insert(officerInfo);
  }

  searchUassignedOfficer(){
    return this.knexConn('officers').select('id').where('status', 'unassigned').orderBy('id', 'desc');
  }

  updateOfficerStatus(officerId, updateFields){
    return this.knexConn('officers').where('id', officerId).update(updateFields);
  }

  searchOfficerByFieldName(fieldName, fieldValue){
    return this.knexConn('officers').select('*').where(fieldName, fieldValue);
  }

  deleteOfficer(officerId){
    return this.knexConn('officers').where('id', officerId).del();
  }
}

module.exports = OfficerDBOperations;
