var AWS = require("aws-sdk");

AWS.config.update({
    region:"us-west-2",
    accessKeyId :"TrongPhung",
    secretAccessKey:"16061361",
    endpoint:"http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var dulieu1 = {
    TableName:"Phims"
    
};
var dulieu2 = {
    TableName:"Movies"

};

dynamodb.deleteTable(dulieu2,function (err, data) {
    if (err){
        console.error("Không thể xóa bảng",JSON.stringify(err,null,2));
    }else {
        console.log("Xóa bảng thành công!!Json:",JSON.stringify(data,null,2));
    }
})