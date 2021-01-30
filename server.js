const express=require("express");
const bodyParser=require("body-parser");
const cors = require("cors");
const fs = require('fs');
const url = require('url');
const { response } = require("express");
const { request } = require("http");

const app=express();

var corsOptions = {
	origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res)=>{
	res.json({message: "Welcome to my app!"});
});

app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static(__dirname + '/public')); 

app.post('/message', function(request, respond) {
    var body = '';
    filePath = __dirname + '/public/data.txt';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function (){
        fs.appendFile(filePath, body, function() {
            respond.end();
        });
    });
});

require("./app/routes/customer.routes.js")(app);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});