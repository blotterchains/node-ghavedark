const mongoose=require('mongoose');
const connection=async ()=>{
    const conn=await mongoose.connect(process.env.MONGODB_URI);
    console.log("dbs connected to:",conn.connections[0].host);
}
module.exports=connection;