const router = require('express').Router();
const controller = require('../controller/controller.js')


router.route('/isthis/:id').get(controller.isIt);

router.route('/today').get(controller.today);
router.route('/vaccineson/:day').get(controller.dayX);
router.route('/total').get(controller.total);
router.route('/avg').get(controller.avg);


router.route('/iam').post(controller.iam);
router.route('/dosage/:id').post(controller.upDosage)

router.route('/api/status').get(controller.status);

router.route('/dosageavg').get(controller.dosageavg);

router.route('/totalnaturalrecovery').get(controller.naturalRecovery)


module.exports = router;