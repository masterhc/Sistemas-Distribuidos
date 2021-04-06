const router = require('express').Router();
const smartphoneController = require('../controllers/smartphoneController');

router.route('/').get(smartphoneController.get)
                 .post(smartphoneController.create);
                     
router.route('/:id').get(smartphoneController.details)
                    .patch(smartphoneController.update)
                    .delete(smartphoneController.delete);


module.exports = router;