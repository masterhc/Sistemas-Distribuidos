const restaurant = require('../models/restaurantsmodel');

exports.get = (req, res) =>
{

    restaurant.get((err,r)=>
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
                data:r
            })
        }
    })
}

exports.getone = (req, res) =>
{
    restaurant.findById(req.params.id, (err, sp)=>
    {
        if(err) res.json(err);
        res.json({
            message:'Info on'+req.params.id,
            data:sp,
        })
    })
}

exports.closeTo = (req, res) =>
{
    restaurant.get((err,r)=>
    {
        if(err) res.json({
            status:'Error',
            message:err
        })
        else
        {
            //Get close code here
            res.json({
                status:'OK',
                message:'Success',
                data:r
            })
        }
    })
}
exports.delete = (req, res) =>
{
    restaurant.deleteOne({_id:req.params.id}, (err)=>
    {
      if(err) res.json({err})
      restaurant.get((err,r)=>
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
                  data:r
              })
          }
      })
    })  
}

exports.update = (req, res) =>
{
    restaurant.findById(req.params.id, (err, R)=>
    {
        if(err) res.json(err);
        else
        {
            R.name = req.body.name; 
            R.address = req.body.address;
            R.save(err=>
                {
                    if(err)res.json(err);
                    res.json({
                        message: 'Updated id:'+req.params.id,
                        data:R
                    })
                })
        }
    })
}

exports.add = (req, res) =>
{
    const R = new restaurant();
    R.name = req.body.name;
    R.address = req.body.address;
    R.geocoords = req.body.geocoords;
    R.hash = req.body.hash;
    R.menu = req.body.menu;
    R.save((err)=>
    {
        if (err) res.json(err);
        res.json({
            message: "Success",
            data: R
        });
    })
}


exports.getMenu = (req, res) =>
{

}

exports.addMenu = (req, res) =>
{

}

exports.deleteMenuItem = (req, res) => 
{

}
exports.updateMenu = (req, res) =>
{

}