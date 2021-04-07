const router = require('express').Router();
const controller = require('../controller/controller');

//API HOME
router.get('/', (req, res)=>
{
    res.json({
        status:'Working',
        message:'The API is working.'
    })
});

// Terrace routes
router.route('/cases').get(controller.view)

router.route('/cases/ic').get(controller.ic)

router.route('/cases/worstDay').get(controller.worstDay)

router.route('/cases/bestDay').get(controller.bestDay)

router.route('/cases/avg').get(controller.avg)

router.route('/cases/totals').get(controller.totals)




module.exports = router;