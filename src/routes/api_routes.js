const router = require('express').Router();
const makeClassInvoker = require('awilix-express').makeClassInvoker;
router.use(require('../lib/database_operations').resolveKnexConnection);

//Add new stolen bike
router.post('/bikes',
  makeClassInvoker(require('../kernel/bikes/operations/bike_operations'))('handleStolenBikeReport')
);

//search bikes with various bike properties
router.get('/bikes',
  makeClassInvoker(require('../kernel/bikes/operations/bike_operations'))('handleBikeSearchWithProperties')
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
