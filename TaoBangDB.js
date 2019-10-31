var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId :"TrongPhung",
    secretAccessKey:"16061361",
    endpoint:"http://localhost:8000"
});

var dynamodb = new AWS.DynamoDB();

var dulieu = {
    TableName: "Phims",
    KeySchema: [
        {AttributeName: "year", KeyType: "HASH"},
         {AttributeName: "title", KeyType: "RANGE"}

    ],

    AttributeDefinitions: [
        {AttributeName: "year", AttributeType: "N"},
        {AttributeName: "title", AttributeType: "S"}

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
var dulieu = {
    TableName: "Phims",
    KeySchema: [
        {AttributeName: "matrochoi", KeyType: "HASH"},
        {AttributeName: "tentrochoi", KeyType: "RANGE"}

    ],

    AttributeDefinitions: [
        {AttributeName: "matrochoi", AttributeType: "N"},
        {AttributeName: "tentrochoi", AttributeType: "S"}

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(dulieu,function (err,data) {
    if (err){
        console.error("Khong the tao bang!!!!",JSON.stringify(err,null,2));
    } else {
        console.log("Tao bang thanh cong,",JSON.stringify(data,null,2));
    }
});


