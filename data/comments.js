const mongoCollection = require('../DbConnection/MongoDbCollection')
const comment = mongoCollection.commentReviews;
var ObjectId = require('mongodb').ObjectID
let exportedMethods = {
    async InsertComments(req, res) {
        const CommentandReviewCollection = await comment();

        await CommentandReviewCollection.insert(req);
    }
}
module.exports = exportedMethods;