const errorResponse=require('../utils/errorResponse');
const errorHandler=(err,req,res,next)=>{
    let error={...err};

    error.message=err.message;
    // log to server
    console.log(` Error ${err.name}`.bgRed+` ${err.stack}`.red);
    // make classs for mongoose error handling
    switch(err.name){
        // catch error for wrong id input
        case "CastError":
            const messsage=`${error.value} is a wrong id`;
            error=new errorResponse(messsage,404);
            break;
        // catch error for wrong input type
        case "ValidationError":
            let message = ""
            for (var tmperr in err.errors){
                message+=`{${tmperr}:${err.errors[tmperr].value}} is wrong input.`
            }
            
            error=new errorResponse(message,400);
            break;
        // catch error for duplicated input
        case "MongoServerError":
            if(err.code===11000){
                let message=`${JSON.stringify(err.keyValue)} is duplicated`;
                error=new errorResponse(message,400);
            }
            break;
    }
    // return error in json 
    res.status(error.statusCode||500).json({
        'status':false,
        'error':error.message || "Server Fault"
    })
}
module.exports=errorHandler