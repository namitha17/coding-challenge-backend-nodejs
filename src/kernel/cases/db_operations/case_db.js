class CaseDBOperations{
  constructor ({ knexConn }){
    this.knexConn = knexConn;
  }

  insertNewCase(newBikeId, assignedOfficerId, caseStatus){
    return this.knexConn('cases').insert({
      bikeid: newBikeId,
      officerid: assignedOfficerId,
      status: caseStatus
    });
  }

  updateCaseDetails(fieldName, fieldValue, updateFields){
    return this.knexConn('cases').where(fieldName, fieldValue).update(updateFields);
  }

  searchCaseByFieldName(fieldName, fieldValue){
    return this.knexConn('cases').select('*').where(fieldName, fieldValue);
  }
}

module.exports = CaseDBOperations;
