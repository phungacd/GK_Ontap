var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region:"us-west-2",
    accessKeyId: "acckeyID",
    secretAccessKey: "secretID",
    endpoint:"http://localhost:8000"
});
var doc = new AWS.DynamoDB.DocumentClient();

console.log("Dữ liệu đang được nạp vào. Xin đợi!!!");

var all_Phim = JSON.parse(fs.readFileSync('moviedata.json','utf8'));

all_Phim.forEach(function (phim) {

    var dulieu ={
        TableName: "Phims",
        Item:{
            "year":phim.year,
            "title":phim.title,
            "info":phim.info,
            "rating":phim.info.rating,
            "image_url":phim.info.image_url,
            "genres":phim.info.genres
        }
    };

    doc.put(dulieu,function (err, data) {
        if (err){
            console.error("Không load dữ liệu vào được!!",phim.title,JSON.stringify(err,null,2));
        } else {
            console.log("Dữ liệu được thêm vào!!",phim.title);
        }
    })
});