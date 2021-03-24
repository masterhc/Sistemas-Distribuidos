//Import Bio Model
Bio = require('../models/model');

//Index
exports.index = (req, res)=>
{
    Bio.get((err, bio)=>
    {
        if (err)
        {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "OK",
            message: "Successfully got Bios",
            data: bio       
        });
    });
};

//New BIO
exports.add = (req, res)=>
{
    var bio = new Bio();
    bio.nome = req.body.nome? req.body.nome: bio.nome;
    bio.email = req.body.email;
    bio.telef = req.body.telef;
    bio.morada = req.body.morada;

    //Saving and error checking
    bio.save((err)=>
    {
        if (err) res.json(err);
        res.json({
            message: "New Bio Added!",
            data: bio
        });
    });
};

//Get Bio
exports.view = (req, res)=>
{
    Bio.findById(req.params.bio_id, (err, bio)=>
    {
        if (err) res.send(err);
        res.json({
            message: 'Bio Details',
            data: bio
        });
    });
};

//Update Bio
exports.update = (req, res)=>
{
    Bio.findById(req.params.bio_id, (err, bio)=>
    {
        if (err) res.send(err);
        bio.nome = req.body.nome ? req.body.nome : bio.nome;
        bio.email = req.body.email;
        bio.telef = req.body.telef;
        bio.morada = req.body.morada;

        //Saving and checking errors
        bio.save((err)=>
        {
            if (err) res.json(err)
            res.json({
                message: "Bio Updated Successfully",
                data: bio
            });
        });
    });
};

//Delete Bio
exports.delete = (req, res)=>
{
    Bio.deleteOne({
        _id: req.params.bio_id
    }, (err, contact)=>
    {
        if (err) res.send(err)
        res.json({
            status: "OK",
            message: 'Bio Deleted!'
        });
    });
};