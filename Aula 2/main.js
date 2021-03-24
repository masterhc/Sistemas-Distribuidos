
const app = require('express')();

var users =
[
    {id:1, username: 'Some1', email:'whocares@caringless.pt'},
    {id:2, username: 'Some1else', email:'some1@caringless.pt'},
    {id:3, username: 'another1', email:'no1@caringless.pt'}
]

app.get('/api/listusers', (req,res)=>
{
    res.send(users);
})
//Call with localhost:5000/api/adduser?username=''&email=''
app.put('/api/adduser', (req, res)=>
{
    users.push({id:users[users.length-1].id+1, username:req.query.username, email:req.query.email})
    res.send(users);
})
//Call with localhost:5000/api/deleteuser?id=1
app.delete('/api/deleteuser', (req,res)=>
{
    console.log('Delete')
    users.splice(users.indexOf(users.find(x=>x.id ===req.query.id)),1);
    res.send(users);
})
//Call with localhost:5000/api?id=1
app.post('/api', (req,res)=>
{
    if(!req.query.id) res.send('No method called')
    res.send(users.find(x=>x.id == req.query.id));
});

app.get('*', (req, res)=>
{
    res.send('Page not found.');
})



app.listen(5000, ()=>{console.log('ServerUP')})