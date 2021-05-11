const vaccineModel = require('../model/model.js');
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const ipAddresses = {}; 

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

exports.iam = (req,res)=>
{
    // req.body.hash  user identifier
    // add to db as new vaccine
    var Vaccine = new vaccineModel();
    Vaccine.name = req.body.name;
    Vaccine.dose_1 = req.body.dose_1;
    Vaccine.dose_2 = req.body.dose_2;
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
exports.isIt = (req, res) =>
{
    //FindOne
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


exports.today = (req, res) =>
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
exports.dayX = (req, res)=>
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
exports.total = (req, res)=>
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
        
exports.avg = (req, res)=>
{
    totals().then(r=>
        {
            console.log('Controller: AVG: ', r.result.length, r.days)
            res.json({
                status:'Ok',
                message:r.result.length/r.days
            })
        })
    }
    
exports.status = (req, res) =>
{
    res.json({
        status:'OK',
        message:'API is OK',
        curIp: ipAddresses
    })
}

exports.dosageavg = (req, res) =>
{
    //Gets the avarege of dosages  as of now. 
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

exports.upDosage = (req, res)=>
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

exports.naturalRecovery = (req, res)=>
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
                message:array
            })
        }).catch(err=>res.json({
            status:"Err",
            message:err
        }))
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
        console.log('Controller: InRange: min -> max Range:', new Date(minRange), new Date(maxRange));
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