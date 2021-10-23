var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb+srv://merit:meritbackend1@cluster0.8rqc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

router.use(express.urlencoded({ extended: true }));
router.use(express.json());


//Allusers
router.get('/allusers', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('packers_users').find().toArray((err, data) => {
            res.send(data)
        })
    })
})

//All orders
router.get("/vieworders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find().toArray((err, data) => {
            res.send(data)
        })
    })
})

//order complete
router.put("/updateorders", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
            db.collection("booknow").updateOne(
                { _id: req.body._id },
                {
                    $set: {
    
                        Record_status: 0,
                        "order_status.status" : "Completed"

                    }
                }, (err, data) => {
                    res.send(data)
                })
    })
})


//process order
router.put("/processorders", (req, res) => {
    console.log(req.params);
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit");
            db.collection("booknow").updateOne(
                { _id: req.body._id },
                {
                    $set: {
    
                        Record_status: 1,
                        "order_status.status" : "Processing"
                    }
                }, (err, data) => {
                    res.send(data)
                })
    })
})

//all contactus
router.get('/allcontactusers', (req, res) => {
    MongoClient.connect(url, (err, conn) => {
        var db = conn.db('merit');
        db.collection('contactus').find().toArray((err, data) => {
            res.send(data)
        })
    })
})

//All bookings
router.get("/bookeddata", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find().toArray((err, data) => {
            res.send(data)
        })
    })

})

//view all quote

router.get("/viewquote", (req, res) => {
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('quote').find().toArray((err, data) => {
            res.send(data)
        })
    })

})

//Add vehicle 


router.post("/vehicleaddnewprice",function(req,res){
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("merit");
        db.collection("vehiclenew").insertOne(req.body,function(err,data){
            res.send(data)
        })
    })
})

//view all vehicle
router.get("/vehicleviewnew",(req,res)=>{
    MongoClient.connect(url,function(err,conn){
        var db=conn.db("merit")
        db.collection('vehiclenew').find().toArray((err,data) => {
            res.send(data)
        })
    })
})

function verifyToken(req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send({link : '/Login'});
		}
		let token = req.headers.authorization.split(' ')[1];

		if (token === 'null') {
			return res.status(401).send({link : '/Login'});
		}

		const payload =  jwt.verify(token, 'secret_key_goes');

		if (!payload) {
			return res.status(401).send({link : '/Login'});
		}
		req.userId = payload._id;
		next();
	} catch(e) {
		return res.status(401).send({link : '/Login'});
	}
}

router.get("/user",verifyToken, function (req, res) {
    let token = req.headers.authorization.split(' ')[1];
    const payload =  jwt.verify(token, 'secret_key_goes');   

    MongoClient.connect(url, function (err, con) {

        var db = con.db("merit")

        db.collection('packers_users').findOne({ _id: ObjectId(payload._id) }, function (err, data) {

            res.send(data)

        })

    })

})



module.exports = router;
