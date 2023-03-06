const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req1, res1){
    res1.sendFile(__dirname+"/signup.html")
})

app.post("/", function(req2, res2){
    var name = req2.body.name;
    var surname = req2.body.surname;
    var email = req2.body.email;


  
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                        FNAME: name,
                        LNAME: surname
                }
            }
        ]
    };

    const dataJSON = JSON.stringify(data);


    var url = "https:us17.api.mailchimp.com/3.0/lists/7fcb556ffe";
    const option ={
        method: "POST"
    }
    const request = https.request(url, option, function(res3){
        if( res3.statusCode === 200){
            res2.sendFile(__dirname+"/successful.html");
        }else{
            res2.sendFile(__dirname+"/failure.html");
        }

    });

     request.write(dataJSON);
     request.end();


});

app.post("/failure", function(req4, res4){
    res4.redirect("/");
});

app.listen(3000);
