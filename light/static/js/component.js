



var heads=Vue.component("heads",{
    template:`
<div>
    <h1 class="title">表格的增删改查 【<a href="#/">首页</a>】【<a href="#/add">添加</a>】【<router-link to="login"> 退出</router-link>】</h1>
</div>    
`
})
var mains=Vue.component("mains",{
    template:`
    <router-view></router-view>
    `
})

var Info=Vue.component('Info',{
    props:["message","showM"],
    template:`<div class="message" v-show="showM">{{message}}</div>`,
})


//等待
var Wait=Vue.component("Wait",{
    template:`<div class="wait">
     <div></div>
     <div></div>
     <div></div>
</div>`
})


var Table=Vue.component("Table",{
    props:["tablehead"],
    template:`
<div>
    <table style="width:800px;margin: 0 auto" class="table table-striped" >
    <tr  >
    <th v-for="item in tablehead" style="text-align: center;background: #e7ded9; padding: 5px 0px">{{item}}</th>
    <th style="text-align: center;background: #e7ded9;padding: 5px 0px">操作</th>
</tr>
<tr v-for="item in datas">
<td>{{item.mname}}</td>
<td>{{item.mage}}</td>
<td>{{item.msex}}</td>
<td><a :href="'#/update/'+item.mid" class="btn btn-success">修改</a>
<a  @click="del(item.mid)" class="btn btn-danger">删除</a>
</td>
</tr>
</table>
<Wait v-show="show"></Wait>

</div>
    `,
    data(){
        return{
            datas:[],
            show:false,
            message:''
        }
    },
    mounted(){
        let that=this;
        this.show=true;
        fetch("/fetch").then(function (e) {

            return e.json();
        }).then((data)=> {
            that.show=false;
              that.datas=data;
        })
    },
    methods:{
        del(id){
            fetch("/del/"+id).then(function (e) {
                return e.text();
            }).then((e)=>{
                if(e==="ok") {
                    this.datas = this.datas.filter(function (item) {
                        if (item.id !==id) {
                            return item
                        }
                    })
                    alert("删除成功");
                }
            })

        },
    }
})

var Index=Vue.component("Index",{

    template:`<div>
<heads></heads>
<Table :tablehead="['姓名','年龄','性别']"></Table></div>`
})
var Add=Vue.component("Add",{
    template:`
<div class="container">
<heads></heads>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">姓名</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="姓名" name="mname" v-model="mname">
  </div>
   <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="年龄" name="mage" v-model="mage">
  </div>
  
  <div class="form-group">
    <label for="age">性别</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="性别" name="msex" v-model="msex">
  </div>
  
  
  <div type="submit" class="btn btn-default" @click="submit">Submit</div>
</form>
<Wait v-show="show"></Wait>
<Info v-show="showM" message="添加成功"></Info>
</div>
    `,
    data(){
        return{
            mid:'',
            mname:'',
            mage:'',
            msex:"",
            show:false,
            showM:false
        }
    },
    methods:{
        submit(){
            let that=this;
            this.show=true;
            var myHeaders = new Headers();
            var datastring="mid="+this.mid+"&mname="+this.mname+"&mage="+this.mage+"&msex="+this.msex
            console.log(datastring)
            fetch("/addCon?"+datastring).then(function (e) {
                console.log(e);
                return e.text();
            }).then((e)=> {
                console.log(e);
                if(e=="ok"){
                    this.show=false;
                    this.showM=true;
                    this.message="添加成功"
                    // alert("操作成功");
                    this.mname="";
                    this.mage="";
                    this.msex="";
                }
            })
        }
    },

})


var update=Vue.component("update", {

    template:`
<div class="container">
<heads></heads>
    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">姓名</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="姓名" name="mname" v-model="mname">
  </div>
   <div class="form-group">
    <label for="age">年龄</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="年龄" name="mage" v-model="mage">
  </div>
  
  <div class="form-group">
    <label for="age">性别</label>
    <input type="text" class="form-control" id="exampleInputEmail1" placeholder="性别" name="msex" v-model="msex">
  </div>
  
  
  <div type="submit" class="btn btn-default" @click="update">Submit</div>
</form>
<Wait v-show="show"></Wait>
<Info v-show="showM" message="添加成功"></Info>
</div>
    `,
    data(){
        return{
            mid:'',
            mname:'',
            mage:'',
            msex:"",
            show:false,
            showM:false
        }
    },

    methods:{
        update()
        {
            let that=this;
            this.show=true;
            var datastring = "mid=" + this.$route.params.mid + "&mname=" + this.mname + "&mage=" + this.mage + "&msex=" + this.msex
            console.log(datastring)
            fetch("/editCon?" + datastring).then(function (e) {
                return e.text();
            }).then((e) => {
                console.log(e);
                if (e == "ok") {
                    this.message="修改成功"
                    this.show=false;
                    this.showM=true;

                    // alert("操作成功");
                    // location.href('#/');
                }
            })
        }
    },
    mounted(){
        fetch("/update/"+this.$route.params.mid).then(function (e) {
            return e.json();
        }).then((e)=>{
            this.mname=e[0].mname;
            this.mage=e[0].mage;
            this.msex=e[0].msex;
        })
    }

})

var login=Vue.component("login",{
    template:`
<div>
<h3 style="text-align: center">登录</h3>
<div style="text-align: center;color: red">{{message}}</div>

   <form style="width: 300px">
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" placeholder="请输入用户名">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" v-model="pass" id="exampleInputPassword1" placeholder="请输入密码">
  </div>
  <button type="button" class="btn btn-success" @click="check" >登陆</button>
  <router-link to="reg" class="btn btn-default" >注册</router-link>

</form>


</div>      
`,
    data(){
        return{
            name:'',
            pass:'',
        }
    },
    methods:{
        check(){
            var seach="name="+this.name+"&pass="+this.pass;
            console.log(seach)
            fetch("/check?"+seach).then(function (e) {
                return e.json();
            }).then((e)=>{
                if(e.state=="ok"){
                    sessionStorage.login=e.code;
                    this.$router.push("/")
                }else{
                    this.$router.push("/login")
                }
            })
        }
    }
})


var reg=Vue.component("reg",{
    template:`

<div>
<h3 style="text-align: center">注册</h3>
<div style="text-align: center;color: red">{{message}}</div>
   <form style="width: 300px">
  <div class="form-group">
    <label for="exampleInputEmail1">用户名</label>
    <input type="text" v-model="name" class="form-control" id="exampleInputEmail1" placeholder="请输入用户名">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">密码</label>
    <input type="password" class="form-control" v-model="pass" id="exampleInputPassword1" placeholder="请输入密码">
  </div>
  
  <div class="form-group">
    <label for="exampleInputPassword1">确认密码</label>
    <input type="password" class="form-control" v-model="pass1" id="exampleInputPassword2" placeholder="请输入密码">
  </div>
  <button type="button" class="btn btn-success" @click="submit" >立即注册</button>
  <router-link to="login" class="btn btn-default" >登录</router-link>

</form>


</div>      
`,
    data(){
        return{
            name:'',
            pass:'',
            pass1:'',
            message:'',
            flag:false
        }
    },
    methods:{
        blur(){
            var search="name="+this.name
            fetch("/asynccheck?"+search).then(function (e) {
                return e.text();
            }).then((e)=>{
                if(e=="ok"){
                    this.flag=true;
                    this.message="注册成功"
                }else{
                    this.flag=false;
                    this.message="已存在"
                }
            })
        },
       submit(){
           if(this.name==""){
               this.message="用户名不能为空"
               return;
           }
           if(this.pass==""){
               this.message="密码不能为空"
               return;
           }
           if(this.pass1==""){
               this.message="要确认密码";
               return;
           }
           if(this.pass!==this.pass1){
               this.message="两次密码不一致";
               return;
           }

           var search="name="+this.name+"&pass="+this.pass;
           console.log(search);
           fetch("/adduser?"+search).then(function (e) {
               return e.text();
           }).then((e)=>{
               if(e=="ok"){
                   this.message="注册成功"
                   this.name='';
                   this.pass='';
                   this.pass1='';
               }else{
                   this.message="注册失败";
                   this.name='';
                   this.pass='';
                   this.pass1='';
               }
           })

       }
    }
})
