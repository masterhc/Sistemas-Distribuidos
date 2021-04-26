exports.sum = (req, res)=>
{
    res.json(
        {
            status:"OK",
            result:(parseInt(req.params.num1, 10) + parseInt(req.params.num2, 10))
        })  
}
exports.sub = (req, res)=>
{
    res.json(
        {
            status:"OK",
            result:(parseInt(req.params.num1, 10) - parseInt(req.params.num2, 10))
        })  
    
}
exports.div = (req, res)=>
{
    res.json(
        {
            status:"OK",
            result:(parseInt(req.params.num1, 10) / parseInt(req.params.num2, 10))
        })  
    
}
exports.mul = (req, res)=>
{
    res.json(
        {
            status:"OK",
            result:(parseInt(req.params.num1, 10) * parseInt(req.params.num2, 10))
        })  
}
