var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)
var User = require('./model/user.js')
var port = process.env.PORT || 4000
var dbUrl = 'mongodb://localhost:27017/xiaotian'

mongoose.connect(dbUrl, function(err) {
	if(!err) {
		console.log('connected to mongodb')
	}else {
		throw err
	}
})

var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(cookieParser());//启动cookie
app.use(express.static(path.join(__dirname,'wangnan')))
app.use(session({
	secret: 'dfsfsdfsdfsdfsdf',
	store: new MongoStore({//session持久化功能实现
        url: dbUrl,//mongodb的链接地址
        collection: 'sessions'
    }),
	resave: false,
	saveUninitialized: true

}))

app.get('/user',function(req, res , next) {
	
	res.end('登录名' + req.session.id)
})

app.post('/getuserlist', urlencodedParser, function(req, res) {

	userdata = {
		sessionid: req.session.id,
		right: req.body.right,
		middle: req.body.middle,
		bottom: req.body.bottom,
		screens: req.body.screen,
		begin: req.body.begin,
		time: req.body.over / 1000
	}
	
	console.log(userdata.screens)
	var user = new User(userdata)
	
	User.find({sessionid:userdata.sessionid}, function(err, docs) {
	   console.log("length == > " + docs.length);
	   if (err) {
		     console.log('err:', err);
		     return;
	   } else if(docs.length > 0){
	   
		    User.update({sessionid:userdata.sessionid},{$set: {right: userdata.right,middle: userdata.middle, bottom: userdata.bottom, screens: userdata.screens,begin: userdata.begin, time: userdata.time}},function(err){
		     console.log('update status:', err ? err : 'success');
		     
		    });
	   } else {
		    user.save(function(err) {    // 执行保存，并查看返回情况
		       console.log('save status:', err ? err : 'success');
		  	});
	   }
	 });

})

app.get('/', function(req,res) {
	res.sendFile(__dirname + '/wangnan/' + 'index.html')
})


app.listen(port,function(){
	console.log('server stated ' + port)
})
