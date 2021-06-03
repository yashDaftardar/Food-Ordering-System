const mongoCollection = require('../DbConnection/MongoDbCollection')
const BestSellers = mongoCollection.BestSellers;
var ObjectId = require('mongodb').ObjectID
global.Result = [];
let exportedMethods = {


    async GetOrder(req, res) {
        const BestSellersmenuCollection = await BestSellers();
        Result = await BestSellersmenuCollection.find().sort({ $natural: -1 }).limit(3).toArray()
        return Result;

    },
    async OrderPresentForBestseller() {

        if (bestseller.length > 0) {
            menubestsellerexits = true;
        } else {
            menubestsellerexits = true;
        }
        return menubestsellerexits
    }

}
module.exports = exportedMethods;