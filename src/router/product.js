const express=require('express');
const Router=express.Router();

const productModel=require('../model/productModel.js');
const mail=require('../email.js');
const util=require('../utils/util.js');


Router.post('/productlist',(req,res)=>{
     let pagesize=Number(req.body.pagesize);
     let target=Number(req.body.target);
     let total=0;
     productModel.find()
    .then((res)=>{  
        total=res.length;
        console.log(total);
       return productModel.find().limit(pagesize).skip((target-1)*pagesize)
     })	
    .then((data)=>{
       let array={total:total,productlist:data}
		 res.send(util.sendData(0,'请求成功',data))
         
	})
	.catch((err)=>{
		
		res.send(util.sendData(-1,'请求错误',null))
	})
	
})

Router.post('/addproduct',(req,res)=>{
    let {name,img,price,desc}=req.body;
    productModel.insertMany({name,img,desc,price})
	.then((data)=>{
	 res.send(util.sendData(0,'添加产品信息成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'添加产品信息失败',null))
	})
});


//分类查询
Router.post('/productByprice',(req,res)=>{
    let pagesize=Number(req.body.pagesize);
    let target=Number(req.body.target)
    let total=0
    let price=req.body.price;
    console.log(price)
    if (!price) {res.send(util.sendData(-1,'参数错误',null))}
    productModel.find({price:price})
    .then(res=>{
        total=res.length;
        return productModel.find({price:price}).limit(pagesize).skip((target-1)*pagesize)
    })
    .then((data)=>{
        let array1={
            total:total,
            data:data
        }
     res.send(util.sendData(0,'查询ok',array1))
    })
    .catch((err)=>{
        res.send(util.sendData(-1,'查询失败',null))
    })
})




//删除产品信息
Router.post('/delproduct',(req,res)=>{

	let id=req.body.id ;
	if (!id) {
		res.send(util.sendData(-1,'参数错误',null));
	}
	productModel.deleteOne({_id:id})
	.then((data)=>{
	 res.send(util.sendData(0,'删除成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'删除失败',null))
	})
})

//批量删除产品信息

Router.post('/delmore',(req,res)=>{
    let id=req.body.id;
    var idarr=JSON.parse(id);
    var arr=idarr.id
    console.log(arr);
    productModel.deleteOne({_id:{$in:arr}})

    .then((data)=>{
        res.send(util.sendData(0,'删除成功',data))
    })
    .catch((err)=>{
        res.send(util.sendData(-1,'删除失败',null))
    })
})


Router.post("count",function(req,res){
 
  productModel.product.find()
    .then((data)=>{
     res.send(util.sendData(0,'查询成功',data))
    })
    .catch((err)=>{
        res.send(util.sendData(-1,'查询失败',null))
    })  
});



//价格查询

Router.post('/productQuery',(req,res)=>{

	let price=req.body.price; 
	if (!price) {res.send(util.sendData(-1,'参数错误',null))}
	productModel.find({price})
	.then((data)=>{
	 res.send(util.sendData(0,'查询成功',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败',null))
	})
})

//修改
Router.post('/confirmProduct',(req,res)=>{

    let id=req.body.id 
     let {name,img,price,desc}=req.body
    if (!id) {res.send(util.sendData(-1,'参数错误',null))}
    productModel.findOneAndUpdate(id,{name,img,price,desc})
    .then((data)=>{
     res.send(util.sendData(0,'您已修改成功，请刷新页面',data))
    })
    .catch((err)=>{
        res.send(util.sendData(-1,'修改失败',null))
    })
})

//获取产品信息通过id
Router.post('/getProductById',(req,res)=>{

	let id=req.body.id 
	if (!id) {res.send(util.sendData(-1,'参数错误',null))}
	productModel.find({_id:id})
	.then((data)=>{
	 res.send(util.sendData(0,'查询ok',data))
	})
	.catch((err)=>{
		res.send(util.sendData(-1,'查询失败',null))
	})
})
module.exports=Router;