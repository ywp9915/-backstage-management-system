const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true } );
let db=mongoose.connection;

db.on('error',() => {
   console.log('connection error:')
});
db.on('open',() => {
    console.log('数据库连接成功');
});
db.on('disconneced',() => {
    console.log('数据库连接断开');
});


