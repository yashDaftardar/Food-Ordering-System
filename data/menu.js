const mongoCollection = require('../DbConnection/MongoDbCollection')
const menu = mongoCollection.Menu;
var ObjectId = require('mongodb').ObjectID
global.Result = [];
let exportedMethods = {

    async addmenu(name, description, category, price) {
        const menuCollection = await menu()
        let data = {
            nameOfDish: name,
            description: description,
            category: category,
            price: price
        }
        const newInsertInformation = await menuCollection.insertOne(data);
        if (newInsertInformation.insertedCount === 0)
            throw 'Insert failed!';

    },
    async GetMenuList(req, res) {
        const menuCollection = await menu();
        var query = { category: req };
        Result = await menuCollection.find(query).toArray()
        return Result;

    }

}
module.exports = exportedMethods;