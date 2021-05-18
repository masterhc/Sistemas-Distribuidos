const vaccineModel = require('../models/model.js');
const UserModel = require('../models/usermodel.js');
const _Crypto = require('../costum_modules/classes.js')._Crypto;
const baker = require('../costum_modules/classes.js').baker;
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const ipAddresses = {}; 

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            if (!ipAddresses[name]) {
                ipAddresses[name] = [];
            }
            ipAddresses[name].push(net.address);
        }
    }
}

exports.register = (req,res)=>
{
    if(!req.headers.cookie)
    {
        if(req.params.user && req.params.pw)
        {
            var user = new UserModel();
            hasher = new _Crypto(req.params.user, req.params.pw);
            user.hash = hasher.Hash
            UserModel.get((err, Users)=>
            {   if(err) reject(err)
                hasher.compare(Users).then(hash=>
                    {
                        if(hash)
                        {
                            res.json({
                                status:'Error',
                                message:'User already exists'
                            })
                        }
                    }).catch(m=>
                        {
                            if(m)
                            {
                                user.save((err)=>
                                {
                                    if(err)res.json({
                                        Status:'Error',
                                        message:err
                                    })
                                    else
                                    {
                                        res.json({
                                            status:'OK',
                                            message:user
                                        })
                                    }
                                }) 
                            }
                        })
            })
            

        }
        else
        {
            res.json({
                status:'Error',
                message:'Please fill all the info.'
            })
        }
    }
    else
        {
            res.json({
                status:'Error',
                message:'User Loged in!'
            })
        }
    

}
exports.login = (req, res)=>
{
    if(req.headers.cookie)
    {
        let ID = req.headers.cookie.split('=')[1];
        if(ID.split('').length==64)
        {
            res.json({
                status:'Error',
                message:'User already logged in.'
            })
        }
    }
    else
    {
        if(req.params.user && req.params.pw)
        {
            UserModel.get((err, Users)=>
            {   
                if(err) res.json({
                    status:'Error',
                    message:err
                })
                new _Crypto(req.params.user, req.params.pw).compare(Users).then(Hash=>
                    {
                        //console.log('Controller: new _Crypto: Then: Hash', Hash)
                        if(Hash)
                        {
                            baker(res, 'ID', Hash, 2).then(()=>
                                {
                                    res.json({
                                        status:'Ok',
                                        message:Hash
                                    })
                                })
                        }
                    }).catch(err=>
                        {
                            //console.log('Controller: new _Crypto: Catch')
                            if(err)
                            {
                                res.json({
                                    status:'Error',
                                    message:'Could not find you.'
                                });
                            }
                        })
            });
        }

    }

}
exports.logout = (req, res)=>
{
    if(req.headers.cookie)
    {
        let ID = req.headers.cookie.split('=')[1];
        if(ID.split('').length==64)
        {
            baker(res, 'ID', '', 0).then(
                ()=>
                {
                    res.json({
                        status:'Ok',
                        message:'User Logged out.'
                    })
                }
            )
        }
    }
    else
    {
        res.json({
            status:'Error',
            message:'No user loged in.'
        })
    }
    
}


exports.iam = (req,res)=>
{
    // req.body.hash  user identifier
    // add to db as new vaccine
    if(req.headers.cookie)
    {
        var Vaccine = new vaccineModel();
        Vaccine.name = req.body.name;
        Vaccine.dose_1 = req.body.dose_1||req.body.dose_2;
        Vaccine.dose_2 = req.body.dose_2;
        if(req.body.naturalRecovery)
        {
            Vaccine.dose_1 = false;
            Vaccine.dose_2 = false;
        }
        Vaccine.naturalRecovery = req.body.naturalRecovery;
        Vaccine.Update = new Date();
        Vaccine.save((err)=>
        {
            if(err)res.json({
                Status:'Failed',
                message:err
            })
            else
            {
                res.json({
                    status:'OK',
                    message:Vaccine
                })
            }
        })
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
   

}
exports.isIt = (req, res) =>
{
    //FindOne
    if(req.headers.cookie)
    {
        vaccineModel.findById(req.params.id,(err, vaccine)=>
        {
            if(err) res.json({
                status:'Err',
                message:err
            })
            else
            {
                res.json({
                    status:'Ok',
                    message:vaccine.dose_1||vaccine.dose_2||vaccine.naturalRecovery
                })
            }
        })
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }

   
}


exports.today = (req, res) =>
{
    if(req.headers.cookie)
    {
        //Total for today
        totals(new Date(), 1).then(r=>
        {
            res.json({
                status:'Ok',
                message:r.result.length,
                body:r.result
            })
        }).catch((err)=>
        {
            res.json({
                status:'Error',
                message:err
            })
        }) 
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
   
}
exports.dayX = (req, res)=>
{
    if(req.headers.cookie)
    {
        totals(readableDay(req.params.day, req.query.month-1, req.query.year),1).then(r=>
        {
            res.json({
                status:'Ok',
                message:r.result.length,
                body:r.result
            })
        }).catch((err)=>
        {
            res.json({
                status:'Error',
                message:err
            })
        })
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
   
}
exports.total = (req, res)=>
{
    if(req.headers.cookie)
    {
        totals(new Date()).then(r=>
        {
            res.json({
                status:'Ok',
                message:r.result.length,
                body:r.result
            })
        }).catch((err)=>
        {
            res.json({
                status:'Error',
                message:err
            })
        })  
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
    
}
        
exports.avg = (req, res)=>
{
    if(req.headers.cookie)
    {
        totals().then(r=>
        {
            //console.log('Controller: AVG: ', r.result.length, r.days)
            res.json({
                status:'Ok',
                message:r.result.length/r.days
            })
        })
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
    
}
    
exports.status = (req, res) =>
{
    res.json({
        status:'OK',
        message:'API is OK',
        body: ipAddresses
    })
}

exports.dosageavg = (req, res) =>
{
    if(req.headers.cookie)
    {
        totals().then((r)=>
        {
            var result = [];
            count = 0;
            for(let i = 0; i<r.result.length;i++)
            {
                if(r.result[i].dose_1||r.result[i].dose_2)
                {
                    result.push(r.result[i]);
                    count++;
                }
                if(r.result[i].dose_1&&r.result[i].dose_2)
                {
                    count++;
                }
            }
            res.json({
                status:"OK",
                message:count/result.length,
                body:result
            })
        }).catch(err=>res.json({
            status:'Err',
            message:err
        })) 
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
    //Gets the avarege of dosages  as of now. 
    
}

exports.upDosage = (req, res)=>
{
    if(req.headers.cookie)
    {
        vaccineModel.findById(req.params.id, (err, vaccine)=>
        {
            if(err)res.json({
                status:"Err",
                message:err
            })
            else
            {
                vaccine.dose_2 = "true";
                vaccine.Update = new Date();
                vaccine.save(err=>
                    {
                        if(err) res.json({
                            status:"Err",
                            message: err
                        })
                        else
                        {
                            res.json({
                                status:"OK",
                                message:vaccine
                            })
                        }
                    })
            }
        })  
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
    
}

exports.naturalRecovery = (req, res)=>
{
    if(req.headers.cookie)
    {
        var array = [];
        totals().then(r=>
        {
            for(let i = 0; i < r.result.length; i++)
            {
                if(r.result[i].naturalRecovery)
                {
                    array.push(r.result[i]);
                }
            }
            res.json({
                status:"OK",
                message:array.length,
                body:array
            })
        }).catch(err=>res.json({
            status:"Err",
            message:err
        }))  
    }
    else
    {
        res.json({
            status:'Error',
            message:'Needs to be logged in to work.'
        })
    }
   
}
function readableDay(day, month, year)
{
    var curDate = new Date()
    return new Date(year || curDate.getFullYear(), month|| curDate.getMonth(), day)
}
/**
 * 
 * @param {Date} day 
 * @returns - Vaccines
 */

function totals (day, range)
{
    return new Promise ((resolve, reject)=>
    {   
        const Day = day || new Date()
        vaccineModel.get((err, vaccines)=>
        {   if(err) reject(err)
            else resolve(inRange(vaccines, Day, range))
        })
    })   
}
/**
 * 
 * @param {*} vaccines 
 * @param {Date} day 
 * @param {Number} range 
 * @returns  - Vaccines
 */
function inRange(vaccines, day, range)
{  
    var result = [];
    if(range)
    {
        var minRange = new Date(day.getFullYear(), day.getMonth(),day.getDate()).setHours(0,0,0,0);
        var maxRange = new Date(day.getFullYear(), day.getMonth(),day.getDate()).setHours((24)*range, 0,0,0)
        //console.log('Controller: InRange: min -> max Range:', new Date(minRange), new Date(maxRange));
        for(let i = 0; i<vaccines.length; i++)
        {
            if(minRange < vaccines[i].Update && vaccines[i].Update < maxRange)
            {
                result.push(vaccines[i]);
            }
        }
        return {
            result : result,
            max : vaccines.length
        }

    }else //All time
    {
        var days = 1;
        for(var i = 1; i<vaccines.length; i++)
        {
            if(new Date(vaccines[i-1].Update).getDate()!=new Date(vaccines[i].Update).getDate())
            {
                days++
            }
        } 
        return { 
            result: vaccines,
            days: days,
            max: vaccines.length // Just for consitency
        }
    }
}
