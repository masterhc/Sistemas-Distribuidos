const crypto = require('crypto');

class _Crypto
{
    constructor(User, Password)
    {
        this.salt = 'H$44Q3RVCd9X8Ef63tB4';
        this.secret = 'mYFUZX9NSx7K74r7Jh@O';
        this.pepper = String.fromCharCode(this.getRandomInt(65, 90));
        this.password = Password;
        this.user = User;
        this.algorithm = 'aes-192-cbc';

    }
    get Hash() // to use on register
    {
        return this.hash()
    }
    hash(p)
    {
        if(!p)
        {
            return crypto.createHmac('sha256', this.secret).update(this.user+this.password+this.salt+this.pepper).digest('hex');  
        }
        else
        {
            return crypto.createHmac('sha256', this.secret).update(this.user+this.password+this.salt+p).digest('hex');  
        }
    }
    
    getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    compare(Users) // to use on login
    {
        return new Promise((resolve, reject)=>
        {
            for(var i=0; i<26;i++)
            {   
                const nPepper = String.fromCharCode(65+i);
                const hash = this.hash(nPepper);
                for(var j = 0; j<Users.length; j++)
                {
                    if(Users[j].hash==hash)
                    {
                        resolve(hash);
                    }
                }
            }
            reject(true)
        });
    }
}module.exports._Crypto = _Crypto;

exports.baker = (res, name, value, timevalue) =>
{
    return new Promise((resolve,reject)=>
    {
        try 
        {
            res.cookie(name, '',{maxAge:0});
            res.cookie(name, value, {maxAge:hours(timevalue),path:'/',secure:false,httpOnly:false});
            resolve();
        }
        catch (e) 
        {
            reject(e)
        }
    })
}
function hours(Hours)
{
    return Hours*60*60*1000;
}