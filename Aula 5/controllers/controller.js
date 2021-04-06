//Import Terrace Model
Terrace = require('../models/model');

//Index
exports.index = (req, res)=>
{
    Terrace.get((err, terrace)=>
    {
        if (err)
        {
            res.json({
                status: "error",
                message: err
            });
        }
        else
        {
            res.json({
                status: "OK",
                message: "Successfully got Terraces",
                data: terrace       
            });
        }
    });
};

//New Terrace
exports.add = (req, res)=>
{
    var terrace = new Terrace();
    terrace.cafe = req.body.cafe? req.body.cafe: terrace.cafe;
    terrace.maxseats = req.body.maxseats;
    terrace.usedseats = req.body.usedseats;
    terrace.address = req.body.address;

    //Saving and error checking
    terrace.save((err)=>
    {
        if (err) res.json(err);
        else
        {
            res.json({
                message: "New Terrace Added!",
                data: terrace
            });
        }
    });
};

//Get Terrace
exports.view = (req, res)=>
{
    Terrace.findById(req.params.terrace_id, (err, terrace)=>
    {
        if (err) res.send(err);
        else
        {
            res.json({
                message: 'Terrace Details',
                data: terrace
            });
        }
    });
};

//Update Terrace
exports.update = (req, res)=>
{
    Terrace.findById(req.params.terrace_id, (err, terrace)=>
    {
        if (err) res.send(err);
        terrace.cafe = req.body.cafe ? req.body.cafe : terrace.cafe;
        terrace.maxseats = req.body.maxseats;
        terrace.usedseats = req.body.usedseats;
        terrace.address = req.body.address;
        //Saving and checking errors
        terrace.save((err)=>
        {
            if (err) res.json(err)
            else
            {
                res.json({
                    message: "Terrace Updated Successfully",
                    data: terrace
                });
            }
        });
    });
};

//Delete Terrace
exports.delete = (req, res)=>
{
    Terrace.deleteOne({_id: req.params.terrace_id}, (err)=>
    {
        if (err) res.send(err)
        else
        {
            res.json({
                status: "OK",
                message: 'Terrace Deleted!'
            });
        }
    });
};