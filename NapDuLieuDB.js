var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region:"us-west-2",
    accessKeyId:"trongphung",
    secretAccessKey:"16061361",
    endpoint:"http://localhost:8000"
});

var doc = new AWS.DynamoDB.DocumentClient();
var all_trochoi=JSON.parse(fs.readFileSync('trochoi.json','utf8'));


all_trochoi.forEach(function (trochoi) {
    var dulieu = {
        TableName: "Trochoiss",
        Item:{
            "matrochoi": trochoi.matrochoi,
            "tentrochoi": trochoi.tentrochoi,
            "ngaythamgia": trochoi.ngaythamgia,
            "tenuser": trochoi.tenuser,
            "diemdatduoc": trochoi.diemdatduoc,
            "cacthongtinkhac": trochoi.cacthongtinkhac
        }
};
doc.put(dulieu,function (err, data) {
    if (err) {
        console.error("Nap du lieu that bai!!", trochoi.tentrochoi, JSON.stringify(err, null, 2));
    } else {
        console.log("Du lieu dang nap:", trochoi.tentrochoi);
    }
})

});
