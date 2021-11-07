const mongoose=require("mongoose");
const bookSchema=mongoose.Schema({
    title:{
        type: String,
        required:[true,"you must enter your name"],
        maxLength:[50,"you cant enter more than 50 character"],
        unique:true,
        trim:true
    },
    author:{
        type:String,
        required:[true,'you must enter author']
    },
    
    summary:{
        type:String,
        required:[true,"you must enter description"],
        maxLength:[500,"you cant enter more than 500 character"],
    },
    pages:{
        type:Number,
        required:[true,"you must enter pages"]
    },
    categories:{
        type:String,
        required:true,
        enum:[
            'Computer',
            'General',
            'Novel'
        ]
    },
    createdAt:{type:Date,default:Date.now},
})
module.exports=mongoose.model('Book',bookSchema);