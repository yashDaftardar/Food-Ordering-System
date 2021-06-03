const mongoCollection = require('../DbConnection/MongoDbCollection')
const coupon = mongoCollection.Coupon;
const usedcoupon = mongoCollection.UsedCoupon;
var ObjectId = require('mongodb').ObjectID
global.Result = [];
let exportedMethods = {

    async GetUsedCouponList(req, res) {
        const usedcouponCollection = await usedcoupon();
        var obj = {
            "coupon": req.body.coupon,
            "emailId": req.session.user.profile.emailId
        }
        Result = await usedcouponCollection.find({ "emailId": req.emailId, "coupon": req.coupon }).toArray()
        return Result;


    },

    async GetCouponList(req, res) {
        const couponCollection = await coupon();
        var query = { category: req };
        Result = await couponCollection.find(query).toArray()
        return Result;

    },
    async Coupondetails(header, code, desp, emailId) {
        const couponCollection = await coupon();
        let obj = {
            header: header,
            code: code,
            description: desp,
            emailId: emailId
        }
        const newInsertInformation = await couponCollection.insertOne(obj);

    }

}
module.exports = exportedMethods;