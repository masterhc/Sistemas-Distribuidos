const router = require('express').Router();
const bioController = require('../controllers/controller');

//API HOME
router.get('/', (req, res)=>
{
    res.send('API WORKING');
});

// Bio routes
router.route('/bio').get(bioController.index)
                    .post(bioController.add);

router.route('/bio/:bio_id').get(bioController.view)
                            .patch(bioController.update)
                            .put(bioController.update)
                            .delete(bioController.delete);

module.exports = router;