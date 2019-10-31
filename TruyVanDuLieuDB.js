var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    accessKeyId: "TrongPhung",
    secretAccessKey: "16061361",
    endpoint: "http://localhost:8000"

});


var doc = new AWS.DynamoDB.DocumentClient();
console.log("Câu truy vấn đang được thực hiện!!!");

//tim nhung doi tuong co nam 2013 va co tua de la rush

var dulieu1 = {
    TableName: "Phims",
    KeyConditionExpression: "#y = :y1 ",
    //FilterExpression:"begins_with(#t,:t1)",
    FilterExpression:"#g =:g1",
   // FilterExpression:"#r between :r1 and :r2",
    ExpressionAttributeNames: {
        "#y": "year",
        "#g":"genres"
        //"#r":"rating"
    },
    ExpressionAttributeValues: {
        // ":n1":1950,
        // ":n2":1959
        ":y1": 2013,
        ":g1":[
            "Action",
            // "Biography",
            // "Drama",
            // "Sport"
        ]
        //  ":r1":7,
        //  ":r2":8.3,

       // ":t1":"Rush"
    }
};

var dulieu2 = {
    TableName: "Phims",
    FilterExpression:"#y between :y1 and :y2",
    ExpressionAttributeNames: {
        "#y": "year",
        //"#t":"image_url"
        //"#r":"rating"
    },
    ExpressionAttributeValues: {
        // ":n1":1950,
        // ":n2":1959
        ":y1": 2010,
        ":y2":2013
        //  ":r1":7,
        //  ":r2":8.3,

        // ":t1":"Rush"
    }
};
var dulieu3 = {
    TableName: "Trochoiss",
    FilterExpression:" #d > :d1 ",
    ExpressionAttributeNames: {
        "#d": "diemdatduoc",
        //"#t":"image_url"
        //"#r":"rating"
    },
    ExpressionAttributeValues: {
        // ":n1":1950,
        // ":n2":1959
        //":y1": 2010,
        ":d1":50
        //  ":r1":7,
        //  ":r2":8.3,

        // ":t1":"Rush"
    }
};


// doc.query(dulieu1, function (err, data) {
// //     if (err) {
// //         console.log("Không thể truy vấn dữ liệu duc", JSON.stringify(err, null, 2));
// //     } else {
// //         console.log("Câu truy vấn đang được thực hiện!!!");
// //         data.Items.forEach(function (p) {
// //             console.log(
// //
// //                 p.year,
// //                 p.title,
// //                 p.info.genres
// //              // + p.info.rating
// //
// //
// //
// //             );
// //         })
// //
// //     }
// // })


doc.scan(dulieu3, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(tt) {
            console.log(

                tt.matrochoi,
                tt.tentrochoi,
                tt.diemdatduoc

                );
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            dulieu3.ExclusiveStartKey = data.LastEvaluatedKey;
            doc.scan(dulieu3, onScan);
        }
    }
}

