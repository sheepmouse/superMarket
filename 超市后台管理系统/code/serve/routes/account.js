var express = require('express');
var router = express.Router();

// 1. 引入jwt
const jwt= require('jsonwebtoken');

// 2. 定义秘钥
const secret = 'itsource';


router.all("*",(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    next();
})

let connection = require("./js/conn.js")
// 添加账号 接受参数
router.post('/addaccount',(req,res)=>{
    let params = { account, password, region}=req.body;
    const sqlStr =`insert into addaccount(account, password, region) values('${account}',' ${password}','${region}')`
    connection.query(sqlStr,(err,data)=>{
        if(err) throw err;
        if(data.affectedRows>0){
            res.send({code:0,reason:"添加账号成功"})
        }else{
            res.send({code:1,reason:"添加账号失败"})
        }
        
    })
 
});



/* 单条删除 */ 
router.get('/accountdel', (req, res) => {
	// 接收id
	let { id } = req.query;

	// 准备sql
	const sqlStr = `delete from addaccount where id=${id}`;
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
router.get('/accountedit', (req, res) => {
	// 接收id
	let { id } = req.query;

	// 准备sql
	const sqlStr = `select * from addaccount where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		
		res.send(data) // 响应数据给前端
	}) 
})

/* 保存修改请求 */ 
router.post('/saveedit', (req, res) => {
	// 接收新数据 和 老id
	let {account, region, id} = req.body;

	// 准备sql
	const sqlStr = `update addaccount set account='${account}', region='${region}' where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '修改成功'})
		} else {
			res.send({code: 1, reason: '修改失败'})
		}
	})
})

//接收批量删除参数的id值

router.get("/massdelete",(req,res)=>{
	let id = req.query.id;
	 //准备sql语句
	 const sqlStr = `delete from addaccount where id in (${id}) `
	console.log(sqlStr)
	 connection.query(sqlStr,(err,data)=>{
		 if(err) throw err;
		 if(data.affectedRows>0){
			 res.send({code:0,reason:'批量删除成功'})
		 }else{
			  res.send({code:1,reason:'批量删除失败'})
		 }
		 
	 })
	
})

/* 按照分页请求数据 */ 
router.get('/accountlistbypage', (req, res) => {
	// 接收参数
	let {pageSize, currentPage} = req.query;

	// 定义变量 保存数据总条数据
	let total;

	// 准备sql
	let sqlStr = `select * from addaccount order by ctime desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length; // 获取数据总条数
	})

	// 构造sql 按照分页查询数据
	let n = (currentPage - 1) * pageSize; // 跳过多少条
	sqlStr += ` limit ${n}, ${pageSize}`; // 分页的sql

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({total, data})  // 把中数据条数 和 当前页码对应的数据响应给前端
	})
})



//登录
/* 检查账号和密码是否正确 */ 
router.post('/checklogin', (req, res) => {
	// 接收参数
	let {account, password} = req.body;

	// 准备sql
	const sqlStr = `select * from addaccount where account='${account}' and password='${password}'`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.length) { // 成功

			// 3. 生成token
			const token = jwt.sign(Object.assign({},  data[0]), secret, {
			    expiresIn:  60 * 60 * 2 // 过期时间
			})

			res.send({ code: 0, reason: '欢迎你，登录成功!', token })
		} else {
			res.send({code: 1, reason: '请检查用户名或密码!'})
		}
	})
})

//高级查询
router.get('/goodslistbypage', (req, res) => {

	// 接收参数
	let {pageSize, currentPage, category, keyWord } = req.query;

	// 构造sql
	let sqlStr = `select * from goods where 1=1`

	// 定义变量 保存数总条数
	let total;

	// 如果分类不等于空 且 不等于全部
	if (category !== '' && category !== '全部分类') {
		// 拼接第一个查询条件
		sqlStr += ` and category='${category}'`;
	}

	// 如果第二个关键字不为空 那么就拼接sql
	if (keyWord !== '') {
		sqlStr += ` and (goodsName like '%${keyWord}%' or barCode like '%${keyWord}%')`
	}

	// 拼接排序
	sqlStr += ` order by ctime desc`

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length;   // 总数据条数(查询过后的总条数)
	})

	// 拼接分页sql
	let n = (currentPage - 1) * pageSize;
	sqlStr += ` limit ${n}, ${pageSize}`;

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ total, data })
	})
})

module.exports = router;
