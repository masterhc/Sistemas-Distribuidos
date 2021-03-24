const express = require('express');
const router = express.Router();
router.get('/',  (req, res)=>
{
    res.send('Routed from an external file.')
})

module.exports = router;
