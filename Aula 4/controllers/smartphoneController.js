const smartphoneModel = require('../models/smartphoneModel');
/**
 * Lists all the items in the DB
 */
exports.get = (req, res)=>
{
    smartphoneModel.get((err,sp)=>
    {
        if(err) res.json({
            status:'Error',
            message:err
        })
        else
        {
            res.json({
                status:'OK',
                message:'Success',
                data:sp
            })
        }
    })
}
/**
 * Creates a new entry 
 */
exports.create = (req, res)=>
{
    var SP = new smartphoneModel();
    SP.name = req.body.name || 'Name Not Found'
    SP.brand = req.body.brand
    SP.save((err)=>
    {
        if (err) res.json(err);
        res.json({
            message: "New smartphone added!",
            data: SP
        });
    })
}
/**
 * Properties of an entry 
 */
exports.details = (req, res)=>
{
    smartphoneModel.findById(req.params.id, (err, sp)=>
    {
        if(err) res.json(err);
        res.json({
            message:'Info on'+req.params.id,
            data:sp,
        })
    })
}


/**
 * Updates an entry 
 */
exports.update = (req, res)=>
{
    smartphoneModel.findById(req.params.id, (err, SP)=>
    {
        if(err) res.json(err);
        SP.name = req.body.name; 
        SP.brand = req.body.brand;
        SP.save(err=>
            {
                if(err)res.json(err);
                res.json({
                    message: 'Updated entry id:'+req.params.id,
                    data:SP
                })
            })
    })
}
/**
 * Removes an entry 
 */
exports.delete = (req, res)=>
{
  smartphoneModel.deleteOne({_id:req.params.id}, (err)=>
  {
    if(err) res.json({err})
    res.json({
        status:'OK',
        message:'Smartphone Deleted.'
    })
  })  
}
