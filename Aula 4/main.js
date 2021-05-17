const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const mongoPW = process.env.MONGOPW || 'admin';
const mongoDB = process.env.MONGODB_URI || `mongodb+srv://admin:${mongoPW}@cluster0.hrgvn.mongodb.net/smartphone?retryWrites=true&w=majority`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', require('./routes/router'));


app.listen(port, ()=>
{
    console.log('Server UP')
    mongoose.Promise = global.Promise;
    //mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true}).then(console.log('connected')).catch(err=>console.log(err));
    
})


const got = require('got');
const cheerio = require('cheerio');

(async () => {
    try {
        const response = await got('https://pt.twstats.com/pt79/index.php?page=ennoblements&live=live');
        const $ = cheerio.load(response.body);
        
        var refactoredData = [];
        for(var i = 1; i< $('table.widget tr').length;i++)
        {
            refactoredData.push(refactorData($('table.widget tr')[i]));
        }
    } catch (error) {
        console.log("Index: Conquuests: GotError:",error);
    }
})()
function refactorData($)
{
    var PrevOwnerTribe = null;
    var PrevOwnerTribeLink = null;
    var NewOwnerTribe = null;
    var NewOwnerTribeLink = null;
    var PrevOwnerLink = null;
    var PrevOwner
    if($.children[2].children.length>=2)//0 -> barbarian 1 -> Player w/out tribe 2 -> Player w/ tribe
    {
        PrevOwner = $.children[2].children[0].children[0].data;
        PrevOwnerLink ='https://pt.twstats.com/pt79/'+$.children[2].children[0].attribs.href;
        if($.children[2].children.length==4)
        {
            PrevOwnerTribe = $.children[2].children[2].children[0].data;
            PrevOwnerTribeLink ='https://pt.twstats.com/pt79/'+$.children[2].children[2].attribs.href;
        }
    }
    if($.children[3].children.length == 4)
    {
        NewOwnerTribe = $.children[3].children[2].children[0].data;
        NewOwnerTribeLink = 'https://pt.twstats.com/pt79/'+$.children[3].children[2].attribs.href;
    }  
    return{
        Date:$.children[4].children[0].data,
        VillageName:$.children[0].children[0].children[0].data,
        VillageLink:'https://pt.twstats.com/pt79/'+$.children[0].children[0].attribs.href,
        VillagePoints:$.children[1].children[0].data,
        PrevOwner:PrevOwner || 'Barbarians',
        PrevOwnerLink: PrevOwnerLink || 'Barbarian Village',
        PrevOwnerTribe: PrevOwnerTribe ||'No tribe',
        PrevOwnerTribeLink: PrevOwnerTribeLink || 'No Tribe',
        NewOwner:$.children[3].children[0].children[0].data,
        NewOwnerLink:'https://pt.twstats.com/pt79/'+$.children[3].children[0].attribs.href,
        NewOwnerTribe: NewOwnerTribe || 'No Tribe',
        NewOwnerTribeLink: NewOwnerTribeLink || 'No Tribe'
    }         
}