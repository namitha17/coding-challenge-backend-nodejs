const router = require('express').Router();
const makeClassInvoker = require('awilix-express').makeClassInvoker;

//Add new stolen bike
router.post('/bikes',
  makeClassInvoker(require('../kernel/bikes/operations/bike_operations'))('handleStolenBikeReport')
);

//search bikes with various bike properties
router.get('/bikes',
  makeClassInvoker(require('../kernel/bikes/operations/bike_operations'))('handleBikeSearchWithProperties')
);

//search bike by id
router.get('/bikes/:id',
  makeClassInvoker(require(  '../kernel/bikes/operations/bike_operations'))('handleBikeSearchWithId')
);

//mark case as resolved
router.put('/cases/:id/resolved',
  makeClassInvoker(require('../kernel/cases/operations/case_operations'))('handleMarkCaseAsResolved')
);

//add new officer
router.post('/officers',
  makeClassInvoker(require('../kernel/officers/operations/officer_operations'))('handleAddNewOfficer')
);

//delete existing officer
router.delete('/officers/:id',
  makeClassInvoker(require('../kernel/officers/operations/officer_operations'))('handleRemoveOfficer')
);

module.exports = router;
