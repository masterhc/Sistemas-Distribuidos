const router = require('express').Router();
const controller = require('../controllers/controller');


router.route('/calc/sum/:num1/:num2').get(controller.sum);
router.route('/calc/sub/:num1/:num2').get(controller.sub);
router.route('/calc/div/:num1/:num2').get(controller.div);
router.route('/calc/mul/:num1/:num2').get(controller.mul);

module.exports = router;