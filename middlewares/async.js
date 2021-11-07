const asyncHandler=fn=>(req,res,next)=>
Promise
// resolve cloned function
.resolve(fn(req,res,next))
// catch if failed send to next midleware
.catch(next);
module.exports=asyncHandler;