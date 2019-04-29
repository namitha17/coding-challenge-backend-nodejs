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

  updateCaseDetails(caseId, updateFields){
    return this.knexCon('cases').where('id', caseId).update(updateFields);
  }

  searchCaseById(caseId){
    return this.knexConn('cases').select('*').where('id', caseId);
  }
}

module.exports = CaseDBOperations;
