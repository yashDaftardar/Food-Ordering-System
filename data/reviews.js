const mongoCollection = require('../DbConnection/MongoDbCollection')
const reviews = mongoCollection.commentReviews;
var ObjectId = require('mongodb').ObjectID
global.Result = [];
let exportedMethods = {

   
    async GetreviewsList(req, res) {
        const reviewsCollection = await reviews();
        Result = await reviewsCollection.find().toArray()
        return Result;

    }

}
module.exports = exportedMethods;