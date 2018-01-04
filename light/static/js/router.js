var router=new VueRouter({
    routes:[
        {
            path:"/",
            component:mains,
            children:[
                {
                  path:"/",
                  component:Index
                },
                {
                    path:"/add",
                    component:Add
                },
                {
                    path:"/update/:mid",
                    component:update
                },
        ]
        },

        {path:"/login",component:login},
        {path:"/reg",component:reg},
    ]
})

router.beforeEach(function (to,from,next) {
    // noinspection JSAnnotator
    if (to.path=="/login"||to.path=="/reg"){
            next();
    }else{
        if(sessionStorage.login){
            next();
        }else{
            router.push("/login")
        }
    }
})