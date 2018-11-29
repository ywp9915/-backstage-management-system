

  const mongoose=require("mongoose");
  let Schema=mongoose.Schema;

  let productSchema=new Schema({
    
    img:{type:String,require:true},
    name:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true}
    
  });

  let productmodel=mongoose.model("product",productSchema);
  module.exports=productmodel;
