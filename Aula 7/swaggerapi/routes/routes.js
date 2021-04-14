const router = require('express').Router();
const restaurant = require('../api/controllers/restaurants');
const user = require('../api/controllers/users');

router.route('/restaurants').get(restaurant.get)
                            .post(restaurant.add);

router.route('/restaurants/:id').get(restaurant.getone)
                                .patch(restaurant.update)
                                .delete(restaurant.delete);

router.route('/restaurants/closeto/:address/:radius').get(restaurant.closeTo)

router.route('/restaurantes/menu/:id/:item_pos').get(restaurant.getMenu)
                                                .post(restaurant.addMenu)
                                                .patch(restaurant.updateMenu)
                                                .delete(restaurant.deleteMenuItem);


router.route('/user/:name/:password').get(user.getone)
                                     .post(user.add)

module.exports = router;