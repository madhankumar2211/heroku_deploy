var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb+srv://merit:meritbackend1@cluster0.8rqc2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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

router.get("/vieworder",verifyToken, (req, res) => {
    let token = req.headers.authorization.split(' ')[1];
    const payload =  jwt.verify(token, 'secret_key_goes');
    MongoClient.connect(url, function (err, conn) {
        var db = conn.db("merit")
        db.collection('booknow').find({user_id : payload._id}).toArray((err, data) => {
            res.send(data)

        })
    })
})


module.exports = router;
