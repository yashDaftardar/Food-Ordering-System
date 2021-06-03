const menusData = require("./menu");
const BestSellersData = require("./bestSeller");
const emailData = require("./email");
const UserData = require("./user");
const orderdata = require('./order')
const couponData = require("./coupon")
const reviewData = require("./reviews")
const commentData = require("./comments")

module.exports = {
    menu: menusData,
    email: emailData,
    BestSellers: BestSellersData,
    user: UserData,
    order: orderdata,
    coupon: couponData,
    reviews: reviewData,
    comments: commentData

};