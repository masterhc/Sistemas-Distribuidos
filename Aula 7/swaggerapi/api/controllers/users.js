const user = require('../models/itemmodel');

exports.getone = (req, res) =>
{
    user.findOne({hash:Hash(req.params.name, req.params.password)}, (err, user)=>
    {
        if(err) res.json(err);
        res.json({
            message:`User ${user.name} exists.`
        })
    })
}
exports.add = (req, res) =>
{
    const U = new user();
    U.name = req.body.name;
    U.hash = req.body.address;
    U.email = req.body.menu;
    U.cellphone = 
    U.
    U.save((err)=>
    {
        if (err) res.json(err);
        res.json({
            message: "Success",
        });
    })
}
