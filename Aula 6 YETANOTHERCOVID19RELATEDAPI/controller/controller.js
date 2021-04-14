//Import Terrace Model
const Cases = require('../models/model');

//Index
exports.view = (req, res)=>
{
    Cases.get((err, cases)=>
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
                message: "Successfully got new cases",
                newCases: cases[0].newConfirmed
            });
        }
    });

};

//New Terrace
exports.ic = (req, res)=>
{
    Cases.get((err, cases)=>
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
                message: "Successfully got new cases",
                newCases: cases[0].intensiveCare
            });
        }
    });
};

//Get Terrace
exports.worstDay = (req, res)=>
{
    Cases.get((err, cases)=>
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
                message: "Successfully got new cases",
                newCases: Math.max.apply(null,Object.values(cases[0].newConfirmed)),
                date: cases[0].Date[Object.keys(cases[0].newConfirmed).reduce((a, b) => cases[0].newConfirmed[a] > cases[0].newConfirmed[b] ? a : b).toString()]
            });
        }
    });
};

//Update Terrace
exports.bestDay = (req, res)=>
{
    Cases.get((err, cases)=>
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
                message: "Successfully got new cases",
                newCases: Math.min.apply(null,Object.values(cases[0].newConfirmed)),
                date: cases[0].Date[Object.keys(cases[0].newConfirmed).reduce((a, b) => cases[0].newConfirmed[a] < cases[0].newConfirmed[b] ? a : b).toString()]
            });
        }
    });
};

//Delete Terrace
exports.avg = (req, res)=>
{
    Cases.get((err, cases)=>
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
                message: "Successfully got new cases",
                averageCases: Object.values(cases[0].newConfirmed).reduce((a, b) => a + b)/Object.values(cases[0].newConfirmed).length
            });
        }
    });
};

exports.totals = (req, res) =>
{
    Cases.get((err, cases)=>
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
                message: "Successfully got new cases",
                weekTotal: Object.values(cases[0].newConfirmed).reduce((a, b) => a + b)
            });
        }
    });
}