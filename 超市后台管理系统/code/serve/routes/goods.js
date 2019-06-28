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
	let {
		classify,
		num,
		name,
		price,
		marketPrice,
		enterpric,
		enterNum,
		weight,
		unit,
		radio,
		radio1
	} = req.body

	// 设置sql语句
	const sqlAll =`insert into goods(classify, num, name, price,marketPrice,enterpric,enterNum,weight,unit,radio,radio1) values(' ${classify}','${num}','${name}','${price}','${marketPrice}','${enterpric}','${enterNum}','${weight}','${unit}','${radio}','${radio1}')`
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


//请求表单数据
router.post("/goodsList",(req,res)=>{
	let {pagesize,currentPage} = req.body
	let total;
	
	// 准备sql
	let sqlStr = `select * from goods order by ctime desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length; // 获取数据总条数
	})
	
	// 构造sql 按照分页查询数据
	let n = (currentPage - 1) * pagesize; // 跳过多少条
	sqlStr += ` limit ${n}, ${pagesize}`; // 分页的sql
	
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({total, data})  // 把中数据条数 和 当前页码对应的数据响应给前端
	})
})

//删除
/* 单条删除 */ 
router.get('/delgoods', (req, res) => {
	// 接收id
	let { id } = req.query;

	// 准备sql
	const sqlStr = `delete from goods where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '删除成功'})
		} else {
			res.send({code: 1, reason: '删除失败'})
		}
	})
})



module.exports = router;
