//mongoose 
const mongoose= require("mongoose");

//schema
const schema =mongoose.Schema;

const details = new schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    }
});

const Detail = mongoose.model("detail",details);

module.exports= Detail;