const router = require('express').Router();
const controller = require('../controllers/controller');

//API HOME
router.get('/', (req, res)=>
{
    res.json({
        status:'Working',
        message:'The API is working.'
    })
});

// Terrace routes
router.route('/terrace').get(controller.index)
                        .post(controller.add);

router.route('/terrace/:terrace_id').get(controller.view)
                                    .patch(controller.update)
                                    .put(controller.update)
                                    .delete(controller.delete);

module.exports = router;