const mongoCollection = require('../DbConnection/MongoDbCollection')
const User = mongoCollection.User;
const bestsellerdb = mongoCollection.BestSellers;
const orderbook = mongoCollection.OrderBooking;
var ObjectId = require('mongodb').ObjectID
global.Result = [];
let exportedMethods = {


    async GetPreviousOrderList(req, res) {
        const UserCollection = await User();
        var query = { "profile.emailId": req };
        Result = await UserCollection.find(query).toArray()
        return Result;

    },
    async InsertOrder(req, res) {
        const orderCollection = await orderbook();

        var query = { category: req };
        await orderCollection.insert(req);
    },
    async InsertBestsellerOrder(req, res) {
        const bestsellerCollection = await bestsellerdb();

        var query = { category: req };
        await bestsellerCollection.insert(req);
    }

}
module.exports = exportedMethods;