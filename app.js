// QUery String
var http = require('http')
var Router = require('routes')()
var view = require('swig')
var url = require('url')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    database : 'crud_nodeJS',
    user : "root",
    password : ""
})

var fs = require('fs')
var gString = require('querystring')


Router.addRoute('/', function(req,res){
    connection.query("select * from mahasiswa", function(err, rows, field){
        if(err) throw err;
        var html = view.compileFile('./template/index.html')({
        title  : "Data Mahasiswa",
         data : rows
        });
    res.writeHead(200, {"Content-Type" : "text/html"})
    res.end(html)

    })

})
// Router.addRoute('/', function(req,res){
//     var html = view.compileFile('./template/index.html')()
//     res.writeHead(200, {"Content-Type" : "text/html"})
//     res.end(html)
// })

Router.addRoute('/contact', function(req,res){
    var html = view.compileFile('./template/contact.html')()
    res.writeHead(200, {"Content-Type" : "text/html"})
    res.end(html)
})


Router.addRoute('/insert', function(req,res){

    if(req.method.toUpperCase() == "POST"){
        var dataPost = "";
        req.on('data', function (chuncks){
            dataPost += chuncks;
        });

        req.on('end', function(){
            dataPost = gString.parse(dataPost);
            var id = dataPost.id
            connection.query("SELECT * from mahasiswa where ?", {id:id}, function(err, rows, field){
                if(err) throw err;
                if(rows.length){
                    var html = view.compileFile('./template/form.html')({
                        alert : 'Data Sudah Ada, Silahkan coba lagi',
                        color : 'alert-danger',
                        col : 'col',
                        row : 'row d-block'
                    });
                    res.writeHead(200, {"Content-Type": "text/html "});
                    res.end(html)
                }else{
                    connection.query("insert into mahasiswa set ? ",dataPost, function(err, field){
                        if(err) throw err;

                        res.writeHead(302, {"Location" : "/"});
                        res.end();

                    });
                }
            })

        })
    }else{
        var html = view.compileFile('./template/form.html')();

        res.writeHead(200, {"Content-Type" : "text/html"})
        res.end(html)
    }
});

Router.addRoute('/update/:idd', function(req,res){

    connection.query("SELECT * from mahasiswa where ?", { id : this.params.idd },
        function(err,rows,field){
            if(rows.length){
                var data = rows[0];
                if (req.method.toUpperCase() == "POST"){
                    var dataPost = "";
                    req.on('data', function (chucks){
                        dataPost += chucks
                    });
                        req.on('end', function (){
                            dataPost = gString.parse(dataPost)
                            connection.query("update mahasiswa set ? where ?",[
                                   dataPost,
                                   { id : data.id }
                               ],function(err,field){
                                   if(err)throw err;

                                   res.writeHead(302,{"Location" : "/"});
                                   res.end();
                               });
                        })
                }else{
                    var html = view.compileFile('./template/form_update.html')({
                        data : data
                    });
                    res.writeHead(200, {"Content-Type": "text/html "});
                    res.end(html)
                }
            }else{
                var html = view.compileFile('./template/Profile.html')()
                res.writeHead(404, {"Content-Type": "text/html "});
                res.end(html)
            }
        }
    );
})

Router.addRoute('/delete/:idd', function(req,res){

    connection.query("delete from mahasiswa where ?",{
        id:this.params.idd
        },
        function(err, fields) {
            if(err)throw err;
            res.writeHead(302, {"Location" : "/"})
            res.end();
        }
    )

})

http.createServer(function (req, res){
    var path = url.parse(req.url).pathname;
    var match = Router.match(path)
    if (match){
        match.fn(req,res)
    }else{
        var html = view.compileFile('./template/Profile.html')()
        res.writeHead(404, {"Content-Type": "text/html "});
        res.end(html)

    }
}).listen(8999);

console.log("Server is Running....")




// ROUTING
// Router.addRoute('/', function (req, res){
//     res.writeHead(200, {"Content-Type" : "text/plain"})
//     res.end("Index Page")
// })
// Router.addRoute('/profile/:nama?', function (req, res){
//     res.writeHead(200, {"Content-Type" : "text/plain"})
//     res.end("Profile Page ==> "+this.params.nama)
// })
//
// http.createServer(function (req, res){
//     var path = url.parse(req.url).pathname;
//     var match = Router.match(path);
//     if (match ){
//         match.fn(req, res)
//     }else{
//         res.writeHead(404,{"Content-Type" : "text/plain"})
//         res.end("Page Not Found !!!")
//     }
//
// }).listen(8989)





// QUery String
// var http = require('http')
// var url = require('url')
// var fs = require('fs')
// var gString = require('querystring')
// http.createServer(function (req, res){
//     if (req.url != '/favicon.ico'){
//         var akses = url.parse(req.url)
//         if (akses.pathname == '/'){
//             var data = gString.parse(akses.query)
//             res.writeHead(200, {'Content-Type' : 'text/plain'})
//             res.end(JSON.stringify(data))
//         }else if(akses.pathname == '/form'){
//             if(req.method.toUpperCase() == 'POST'){
//             //    POST
//                 var dataPost = ''
//                 req.on('data', function (chuck){
//                     dataPost += chuck;
//                 })
//
//                 req.on('end', function(){
//                     dataPost = gString.parse(dataPost)
//                     res.writeHead(200, {'Content-Type':'text/plain'})
//                 res.end(JSON.stringify(dataPost.nama))
//                 })
//             }else{
//                 //GET
//                 res.writeHead(200, {'Content-Type' : 'text/html'})
//                 fs.createReadStream('./template/form.html').pipe(res)
//             }
//
//         }else{
//             res.writeHead(404, {'Content-Type' : 'text/plain'})
//             res.end('Page Not Found')
//         }
//     }
// }).listen(8088);
//
// console.log("Server is Running .....")

// =================================================================
// Basic Server
// var http = require('http');
// var fs = require('fs');
//
// http.createServer(function (req, res){
//     var kode = 0
//     var file = ''
//     if(req.url == '/'){
//     //  index
//         kode = 200;
//         file = 'index.html'
//     }else if(req.url == '/contact'){
//     //  Contact
//         kode = 200;
//         file = 'contact.html'
//     }else{
//     //  Profile
//         kode = 404;
//         file = 'profile.html'
//     }
//     console.log(req.url)
//     res.writeHead(kode, {"Content-Type" : "text/html"});
//     fs.createReadStream('./template/'+file).pipe(res)
// }).listen(8088);
//
// console.log("Server is Running .....")






//==============================================================
//SHARE MODULE & OBJECT FACTORY
// require('./modul2.js');
// console.log("===============================")
// require('./modul3.js');


// EVENT HANDLING

// function Order(idOrder, timeOut){
//     console.log("ID Order " + idOrder);
//     processOrder(idOrder, timeOut)
// }
//
// function processOrder(idOrder, timeOut){
//     setTimeout(function(){
//         console.log('ID Order '+idOrder+' Processed');
//     }, timeOut)
// }
//
// Order(101, 2000);
// Order(102, 1000);
// Order(103, 500);

// OBJECT REFERENCES

// var myObj =
//     {
//         name : "Rizkan FIrmansyah",
//         age:18,
//     }
//
//     var obj2 = myObj;
//     obj2.age = 19;
//
// console.log(myObj)

//THIS OBJECT
// var myObj =
//     {
//         name : "Rizkan FIrmansyah",
//         age:18,
//         print: function(){
//             console.log('umurku ' + this.age + ' tahun');
//             console.log(this === myObj);
//         }
//     }
//
//     function myFunc(){
//         console.log('this my function')
//         console.log(this === global)
//     }
//
//     myObj.print();
//     console.log("====================================================");
//     myFunc()

