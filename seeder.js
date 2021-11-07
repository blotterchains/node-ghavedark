const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
// load enviroment
dotenv.config({ path:"./config/config.env" });
// load models
const Book=require('./models/Books');
// connect to mognoose
mongoose.connect(process.env.MONGODB_URI);   
// load files
const books=JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`,'utf-8'));
const importData=async ()=>{
    try {
        await Book.create(books);
        process.exit();
    } catch (error) {
        
    }
}
const deleteData=async ()=>{
    try {
        await Book.deleteMany();
        process.exit();
    } catch (error) {
        
    }
}
if(process.argv[2]==='-i'){
    importData()
}else if(process.argv[2]==='-d'){
    deleteData()
}
