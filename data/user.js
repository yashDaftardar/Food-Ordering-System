const mongoCollection = require('../DbConnection/MongoDbCollection')
const User = mongoCollection.User;

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var ObjectId = require('mongodb').ObjectID

let exportedMethods = {
    async InsertUserData(req, res) {


        const userCollection = await User();
        await userCollection.findOne({ "profile.emailId": req.profile.emailId }, async function(err, user) {

            // Make sure user doesn't already exist
            if (user) {
                res.render('User/signinError')
                    //return console.log('The email address you have entered is already associated with another account.');
            } //res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
            else {

                const newInsertInformation = await userCollection.insertOne(req);

                res.render('User/login', { menubestsellerexits: menubestsellerexits });

            }
        });




    },
    async addUserData(username, pass, mobileNumber, address) {
        var hash = bcrypt.hashSync(pass, salt);
        const userCollection = await User();

        var obj = {
            hashedPassword: hash,
            profile: {
                name: 'Kalli',
                mobileNumber: mobileNumber,
                emailId: username,
                address: address
            },
            previous: [],
            Total: ""
        }
        const newInsertInformation = await userCollection.insertOne(obj);



    }


}
module.exports = exportedMethods;