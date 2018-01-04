var light=require("ueklight");
var router=light.Router();
var mysql=require('./mysql.js');
var md5=require('./md5.js')



router.get("/",function(req,res){
    // console.log(res.render);
    res.render("index.html",{name:"light"});
})

router.get("/fetch",function (req,res) {
    setTimeout(function () {
        mysql.query("select * from mode",function (err,result) {
        if(err){
            res.end();
        }else{
            res.send(JSON.stringify(result));
        }
    })},2000)
})
router.get("/addCon",function (req,res) {
    var mname=req.query.mname;
    var mage=req.query.mage;
    var msex=req.query.msex;

    mysql.query(`insert into mode (mname,mage,msex) values ('${mname}','${mage}','${msex}')`,function (err,result) {
        if(err){
            res.end("err")
        }else{
            res.end("ok")
        }
    })
    res.end();
})
router.get("/del/:id",function (req,res) {
    var id=req.params.id;
    mysql.query("delete from mode where mid="+id,function (err) {

        if(err){
            res.end("err");
        }else{
            res.end("ok");
        }

    })
})
router.get("/update/:mid",function (req,res) {
    var id=req.params.mid;
    console.log(id);
    mysql.query(`select * from mode where mid='${id}'`,function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result));
        }
    })
})
router.get("/editCon",function (req,res) {
    var mid=req.query.mid;
    var mname=req.query.mname;
    var mage=req.query.mage;
    var msex=req.query.msex;
console.log()
    mysql.query(`update mode set mname='${mname}',mage='${mage}',msex='${msex}' where mid='${mid}'`,function (err,result) {
        if(err){
            res.end("err")
        }else{
            res.end("ok")
        }
    })
})

router.get("/check",function (req,res) {
    var name=req.query.name;
    var pass=md5(req.query.pass);
    console.log(name)
    console.log(pass)
    mysql.query(`select * from user where name='${name}' and pass='${pass}'`,function (err,result) {
        if(err){
            res.end("err")
        }else{
            if(result.length>0){
                var obj={code:md5(name),state:"ok"};
                res.send(JSON.stringify(obj));
            }else{
                var obj={code:'',state:"err"};
                res.send("err");
            }
        }
    })

})
router.get("/asynccheck",function (req,res) {
    var name=req.query.name;
    mysql.query(`select * from user where name='${name}'`,function (err,result) {
        if(err){
            res.end("err")
        }else{
            res.end("ok");
        }
    })
})
router.get("/adduser",function (req,res) {
    var name=req.query.name;
    var pass=md5(req.query.pass);

    mysql.query(`insert into user (name,pass) values ('${name}','${pass}')`,function (err,result) {
        if(err){
            res.send("err");
        }else{
            if(result.affectedRows>0){
                res.send("ok");
            }else{
                res.send("err");
            }
        }
    })
})