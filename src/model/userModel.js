

const  mongoose=require('mongoose')
 let Schema = mongoose.Schema;

  let userSchema=new Schema({
    user:{type:String,required:true},
    password:{type:String,required:true}
  })
  // type 字段类型  required 是否必须
 let usermodel=mongoose.model('user', userSchema);
  //参数1  集合名字  参数2是 schema对象 将schema对象变成model
  module.exports=usermodel