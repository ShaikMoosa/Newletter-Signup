const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    //console.log(firstName, lastName, email);
    const data = {
       members: {
        email_address: email,
        status: "subscribed",
        merge_feilds: {
            FNAME: firstName,
            LNAME: lastName
        }
       }
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/cc3a6f6649";//us21 is taken from api key
    
    const options = {
        method:"POST",
        auth:"moosa:267980425399e5c5e7b1afec98285378-us21"
    }
    
    const request = https.request(url, options, function(response){
      
        if (response.statusCode === 200) {
           // res.send("Successfully subscribed!");
           res.sendFile(__dirname + "/success.html");
        } else {
           
            //res.send("There was an error with signing up, please try again!")
            res.sendFile(__dirname + "/failure.html");
        }

      
      
      
        response.on("data",function(data){
        console.log(JSON.parse(data));
       });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("server is running on port 30000");
});

// api key : ef7312bc14df97dfc2ef75ce402d9f7e-us21
// audiance io :  cc3a6f6649.


//if you want to upload in a server 
// app.listen(process.env.PORT || 300 function(){
// console.log("server is running on port 30000");
//});