import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name : {
        type :String,
        require :true,
    },
    description:{
        type : String,
        require:true,
    },
    price: {
        type:Number,
        require:true
    },
    image:{
        type:Array,
        require:true
    },
    Category:{
        type:String,
        require:true
    },
    sizes:{
        type:Array,
        require:true
    },
    size:{
        type:Array,
        require:true,
    },
    bestSeller:{
        type:Boolean
    },
    date:{
        type:Number,
        require:true
    }
})

const productModel  = mongoose.models.product ||  mongoose.model('product',productSchema)

export default productModel;