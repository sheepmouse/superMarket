var express = require('express');
var router = express.Router();

//请求头
router.all("*", (req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
})
//连接数据库
let connection = require("./js/conn.js")


router.post('/', (req, res) => {
	let {codenum,price,num} = req.body

	// 设置sql语句
	const sqlAll =`insert into Addinventory(codenum,price,num) values(${codenum},${price},${num})`
	connection.query(sqlAll,(err,data)=>{
		if(err) throw err;
		console.log(data)
		if(data.affectedRows>0){
			res.send({code:1,reason:'添加成功'})
		}else{
			res.send({code:0,reason:'添加失败'})


		}
	})
})


module.exports = router;
