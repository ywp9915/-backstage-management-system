const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const db=require('./dbconnect.js');
const path=require("path");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/admin',express.static(path.join(__dirname,'./admin')));



const user=require('./router/user.js');

const product=require('./router/product.js');

const upload=require('./router/upload.js');

app.use("/api/user",user);
app.use("/api/product",product);
app.use("/api/upload",upload);
// app.get('/login',(req,res)=>{
//     res.send("ok!");
// });

app.listen(3000,()=>{
    console.log("服务器开启成功！");
});
