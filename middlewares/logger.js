const colors=require('colors');
logger=(req,res,next)=>{
    switch(req.method){
        case 'GET':
            console.log(`${req.method}`.bgGreen+` ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            break;
        case 'POST':
            console.log(`${req.method}`.bgYellow+` ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            break;
        case 'DELETE':
            console.log(`${req.method}`.bgRed+` ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            break;
        case 'PUT':
            console.log(`${req.method}`.bgBlue+` ${req.protocol}://${req.get("host")}${req.originalUrl}`);
            break;
    }
    
    next();
}
module.exports=logger;