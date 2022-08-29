const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({

    name:{
        type:String,
        maxlength:32,
        required:true,
        trim:true,
    },

    description:{
        type:String,
        maxlength:2000,
        trim:true,
        required:true,
    },

    price:{
        type:Number,
        required:true,
        trim:true,
    },

    stock:{
        type:Number,
    },

    sold:{
        type:Number,
        default:0,
    },

    category:{
        type:ObjectId,
        ref:"Category",
        required:true,

    },

    photo:{
        data:Buffer,
        contentType:String,
    }




},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)