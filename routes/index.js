const mongoCollections = require('../DbConnection/MongoDbCollection');
const dbConnection = require("../DbConnection/MongoDbConnection");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const path = require("path");
var nodemailer = require("nodemailer");
var fs = require('fs');
const data = require('../data');
const UsedCoupon = mongoCollections.UsedCoupon;

const menudata = data.menu;
const bestsellerdata = data.BestSellers;
const reviewdata = data.reviews;
const coupondata = data.coupon;
const orderdata = data.order
const emaildata = data.email;
const userdata = data.user
const registeruser = mongoCollections.User;
const ctdata = data.comments;

const bestsellerdb = mongoCollections.BestSellers;
const menu = mongoCollections.Menu;
const orderbook = mongoCollections.OrderBooking;

var db = require('node-localdb');
const d = require("../data/bestSeller");

global.Result = [];
global.TotalAmount = "";
global.OrderBooked = [];
global.badgecount = 0;
global.bestseller = [];
global.menubestsellerexits = false;
let totalamount = 0.00;
let amount = 0.00;

let taxcharge = 3.65;


const constructorMethod = app => {
    app.get("/", async(req, res) => {
        Reviews = await reviewdata.GetreviewsList();
        req.session.AuthCookie = false;

        bestseller = await bestsellerdata.GetOrder();
        menubestsellerexits = await bestsellerdata.OrderPresentForBestseller();

        if (badgecount != 0) {
            res.render("layouts/home")
                /* res.render("menu/MainMenu", {
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller,
                    Reviews: Reviews,
                    reviewflag: true
                }); */
        } else {
            res.render("layouts/home")
                //res.render("menu/MainMenu", { menubestsellerexits: menubestsellerexits, bestseller: bestseller, Reviews: Reviews, reviewflag: true });
        }
    });

    app.get("/home", async(req, res) => {
        res.render("layouts/home")
    })
    app.get("/menu", async(req, res) => {
        Reviews = await reviewdata.GetreviewsList();
        bestseller = await bestsellerdata.GetOrder();
        menubestsellerexits = await bestsellerdata.OrderPresentForBestseller();
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/MainMenu", {
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller,
                    Reviews: Reviews,
                    reviewflag: true
                });

            } else {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", menubestsellerexits: menubestsellerexits, bestseller: bestseller, Reviews: Reviews, reviewflag: true });
            }

        } else {
            if (badgecount != 0) {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });

            } else {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
            }

        }

    });
    app.post("/MainCourse", async(req, res) => {
        menubestsellerexits = false;
        const result = await menudata.GetMenuList("Main Course", res);
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Main Course",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits

                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Main Course",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits
                });
            }
        } else {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Main Course",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Main Course",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits
                });
            }

        }

    });

    app.post("/Sides", async(req, res) => {
        menubestsellerexits = false;
        const result = await menudata.GetMenuList("Sides", res);
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Sides",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Sides",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits
                });
            }

        } else {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Sides",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Sides",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits
                });
            }
        }
    });

    app.post("/Starters", async(req, res) => {
        menubestsellerexits = false;
        const result = await menudata.GetMenuList("Starters", res);
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Starters",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Starters",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits,
                    menubestsellerexits: menubestsellerexits
                });
            }
        } else {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Starters",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Starters",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits
                });
            }

        }
    });

    app.post("/Desserts", async(req, res) => {
        menubestsellerexits = false;
        const result = await menudata.GetMenuList("Desserts", res);
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Desserts",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Desserts",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits
                });
            }

        } else {
            if (badgecount != 0) {
                res.render("menu/SubMenuList", {
                    viewTitle: "Desserts",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/SubMenuList", {
                    viewTitle: "Desserts",
                    list: result,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits
                });
            }
        }
    });

    app.post("/AddToList", (req, res) => {

        menubestsellerexits = false;
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/AddToCart", {
                    nameOfDish: req.body.nameOfDish,
                    price: req.body.price,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount
                });
            } else {
                res.render("menu/AddToCart", {
                    nameOfDish: req.body.nameOfDish,
                    price: req.body.price,
                    isAuthenticated: req.session.AuthCookie,
                    userName: ""
                });
            }

        } else {
            if (badgecount != 0) {
                res.render("menu/AddToCart", {
                    nameOfDish: req.body.nameOfDish,
                    price: req.body.price,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount
                });
            } else {
                res.render("menu/AddToCart", {
                    nameOfDish: req.body.nameOfDish,
                    price: req.body.price,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie
                });
            }

        }
    });

    app.post("/AddQty", async(req, res) => {
        Reviews = await reviewdata.GetreviewsList();
        menubestsellerexits = false;
        badgecount += 1;

        let obj = {
                nameOfDish: req.body.nameOfDish,
                price: req.body.price.split('$')[1],
                QtyDropdown: req.body.QtyDropdown,
                Total: (req.body.price.split('$')[1] * req.body.QtyDropdown)
            }
            //req.body.price = req.body.price.split('$')[1];
        OrderBooked.push(obj);

        bestseller = await bestsellerdata.GetOrder();
        menubestsellerexits = bestsellerdata.OrderPresentForBestseller();

        if (req.session.AuthCookie == false) {
            if (badgecount != 0) {
                res.render("menu/MainMenu", {
                    badgecount: badgecount,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller,
                    Reviews: Reviews,
                    reviewflag: true
                });
            } else {
                res.render("menu/MainMenu", {

                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller,
                    Reviews: Reviews,
                    reviewflag: true
                });
            }
        } else {
            if (badgecount != 0) {
                res.render("menu/MainMenu", {
                    badgecount: badgecount,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller,
                    Reviews: Reviews,
                    reviewflag: true
                });
            } else {
                res.render("menu/MainMenu", {
                    badgecount: badgecount,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller,
                    Reviews: Reviews,
                    reviewflag: true
                });
            }
        }
    });

    app.post("/BookOrder", async(req, res) => {
        try {
            menubestsellerexits = false;

            if (req.session.AuthCookie == false || typeof req.session.user.profile == undefined) {
                if (badgecount != 0) {
                    res.render("menu/UserDetails", { isAuthenticated: req.session.AuthCookie, userName: "", badgecount: badgecount });
                } else {
                    res.render("menu/UserDetails", { isAuthenticated: req.session.AuthCookie, userName: "" });
                }

            } else {
                if (badgecount != 0) {
                    res.render("menu/UserDetails", {
                        isAuthenticated: req.session.AuthCookie,
                        userName: req.session.AuthCookie,
                        badgecount: badgecount,
                        name: req.session.user.profile.name,
                        mobileNumber: req.session.user.profile.mobileNumber,
                        emailId: req.session.user.profile.emailId,
                        address: req.session.user.profile.address
                    });
                } else
                    res.render("menu/UserDetails", {
                        isAuthenticated: req.session.AuthCookie,
                        userName: req.session.AuthCookie,
                        name: req.session.user.profile.name,
                        mobileNumber: req.session.user.profile.mobileNumber,
                        emailId: req.session.user.profile.emailId,
                        address: req.session.user.profile.address
                    });

            }
        } catch (e) {
            req.session.AuthCookie == false;
            if (badgecount != 0) {
                res.render("menu/UserDetails", { isAuthenticated: req.session.AuthCookie, userName: "", badgecount: badgecount });
            } else {
                res.render("menu/UserDetails", { isAuthenticated: req.session.AuthCookie, userName: "" });
            }
        }
    });
    app.get("/ProceedToOrder", async(req, res) => {
        menubestsellerexits = false;
        let totalamount = 0.00;
        let amount = 0.00;
        let taxcharge = 3.65;
        OrderBooked.forEach(element => {
            amount += element.Total;
        });
        totalamount = taxcharge + amount;

        TotalAmount = totalamount;

        const result = await coupondata.GetCouponList();

        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {

            if (badgecount != 0) {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits,

                    useCoupon: ""
                });
            } else {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits,

                    useCoupon: ""
                });
            }
        } else {

            if (badgecount != 0) {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits,
                    Coupon: result,
                    useCoupon: true
                });
            } else {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits,

                    useCoupon: true
                });
            }

        }


    });
    app.post("/UserDetails", async(req, res) => {
        //menubestsellerexits =false;
        Reviews = await reviewdata.GetreviewsList();

        var obj = {
            profile: req.body,
            Order: OrderBooked,
            Total: TotalAmount
        }

        await orderdata.InsertOrder(obj, res);
        await orderdata.InsertBestsellerOrder(OrderBooked, res)
        const dbuserCollection = await registeruser();
        await dbuserCollection.update({ "profile.emailId": req.body.emailId }, { $set: { 'Order': OrderBooked, "Total": TotalAmount } })
        await emaildata.sentmail(req.body, res)
        badgecount = 0;
        menubestsellerexits = true;
        bestseller = await bestsellerdata.GetOrder();
        menubestsellerexits = bestsellerdata.OrderPresentForBestseller();

        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
            } else {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
            }

        } else {
            if (badgecount != 0) {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: req.session.AuthCookie, badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
            } else {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: req.session.AuthCookie, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
            }

        }

        badgecount = 0;
        OrderBooked = [];
    });
    app.post("/CancleOrder", (req, res) => {
        menubestsellerexits = false;

        let obj = {
            nameOfDish: req.body.nameOfDish,
            price: req.body.price.split('$')[1],
            QtyDropdown: req.body.QtyDropdown,
            Total: (req.body.price.split('$')[1] * req.body.QtyDropdown)
        }

        OrderBooked.pop(obj);
        badgecount -= 1;

        totalamount = 0.00;
        amount = 0.00;
        taxcharge = 3.65;
        OrderBooked.forEach(element => {
            //let p = element.price.split('$')[1];
            // amount +=(p*element.QtyDropdown);
            amount += element.Total;
        });
        totalamount = taxcharge + amount;

        TotalAmount = totalamount;
        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    menubestsellerexits: menubestsellerexits
                });
            }
        } else {

            if (badgecount != 0) {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits
                });
            } else {
                res.render("menu/OrderBookingPage", {
                    viewTitle: "Your Order",
                    list: OrderBooked,
                    amount: amount,
                    totalamount: totalamount,
                    taxcharge: taxcharge,
                    isAuthenticated: req.session.AuthCookie,
                    userName: req.session.AuthCookie,
                    menubestsellerexits: menubestsellerexits
                });
            }
        }
    });
    app.get("/login", (req, res) => {
        menubestsellerexits = false;
        if (badgecount != 0) {
            res.render("User/login", { badgecount: badgecount });
        } else {
            res.render("User/login");
        }
    });

    app.get("/signin", (req, res) => {
        menubestsellerexits = false
        if (badgecount != 0) {
            res.render("User/signin", { badgecount: badgecount });
        } else {
            res.render("User/signin");
        }

    });

    app.get("/logout", async(req, res) => {
        Reviews = await reviewdata.GetreviewsList();
        bestseller = await bestsellerdata.GetOrder();
        req.session.AuthCookie = false
        menubestsellerexits = bestsellerdata.OrderPresentForBestseller();

        badgecount = 0;
        previousOrderList = [];
        OrderBooked = [];
        req.session.destroy(function(err) {})
        if (badgecount != 0) {
            res.render("menu/MainMenu", { isAuthenticated: false, badgecount: badgecount, menubestsellerexits: menubestsellerexits, bestseller: bestseller, Reviews: Reviews, reviewflag: true });

        } else {
            res.render("menu/MainMenu", { isAuthenticated: false, menubestsellerexits: menubestsellerexits, bestseller: bestseller, Reviews: Reviews, reviewflag: true });

        }

    });

    app.get("/previousorder", async(req, res) => {
        try {
            Reviews = await reviewdata.GetreviewsList();
            bestseller = await bestsellerdata.GetOrder();
            menubestsellerexits = bestsellerdata.OrderPresentForBestseller();;


            if (req.session.AuthCookie == false || typeof req.session.user.profile == undefined) {
                if (req.session.AuthCookie == false) {
                    if (badgecount != 0) {
                        res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true, commentflag: true });
                    } else {
                        res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true, commentflag: true });
                    }

                } else {
                    if (badgecount != 0) {
                        res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true, commentflag: true });
                    } else {
                        res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true, commentflag: true });
                    }

                }


            } else {
                if (req.session.AuthCookie == false) {
                    if (badgecount != 0) {
                        res.render("User/recentOrder", { isAuthenticated: req.session.AuthCookie, userName: "", badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits });
                    } else {
                        res.render("User/recentOrder", { isAuthenticated: req.session.AuthCookie, userName: "", bestseller: bestseller, menubestsellerexits: menubestsellerexits });
                    }

                } else {

                    //previousOrderList = await previousOrderdata.GetPreviousOrderList(req.session.user.profile.emailId, res);

                    //console.log("GetPreviousOrderList");

                    //  console.log(JSON.stringify(previousOrderList));

                    if (badgecount != 0) {
                        res.render("User/recentOrder", { isAuthenticated: req.session.AuthCookie, userName: req.session.AuthCookie, badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, list: req.session.user.Order });
                    } else {
                        res.render("User/recentOrder", { isAuthenticated: req.session.AuthCookie, userName: req.session.AuthCookie, bestseller: bestseller, menubestsellerexits: menubestsellerexits, list: req.session.user.Order });
                    }

                }
            }
        } catch (e) {
            console.log(e);
            if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
                if (badgecount != 0) {
                    res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
                } else {
                    res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
                }

            } else {
                if (badgecount != 0) {
                    res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
                } else {
                    res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
                }

            }
        }

    });
    app.post("/signin", [check('emailId', "Invalid email address").isEmail()], async(req, res) => {
        menubestsellerexits = false;;
        let errors = validationResult(req);
        let success = false;
        let msg = "";
        if (!errors.isEmpty()) {

            success = true;

            if (badgecount != 0) {
                res.render('User/signin', { errors: errors, success: success, badgecount: badgecount });
            } else {
                res.render('User/signin', { errors: errors, success: success });
            }

        } else {
            var hash = bcrypt.hashSync(req.body.password, salt);


            var obj = {
                "sessionId": "",
                hashedPassword: hash,
                profile: {
                    name: req.body.name,
                    mobileNumber: req.body.mobileNumber,
                    emailId: req.body.emailId,
                    address: req.body.address
                },
                previous: [],
                Total: ""
            }
            await userdata.InsertUserData(obj, res)
            await emaildata.sentmail1(req, res)

        }


    });

    app.post('/login', async function(req, res) {
        Reviews = await reviewdata.GetreviewsList();
        bestseller = await bestsellerdata.GetOrder();
        menubestsellerexits = bestsellerdata.OrderPresentForBestseller();

        req.session.AuthCookie = false
        const dbuserCollection = await registeruser();

        await dbuserCollection.findOne({ "profile.emailId": req.body.emailId }, async function(err, user) {

            // Make sure user doesn't already exist
            if (user) {

                let passbool1 = bcrypt.compareSync(req.body.password, user.hashedPassword); // true

                if (passbool1) {

                    req.session.AuthCookie = user.profile.name;
                    req.session.user = user;

                    await dbuserCollection.update({ "profile.emailId": req.body.emailId }, { $set: { 'sessionId': req.sessionID } })
                        // console.log(cookieParser.signedCookie(cookie, secret));

                    if (badgecount != 0) {
                        res.render('menu/MainMenu', {
                            isAuthenticated: req.session.AuthCookie,
                            userName: req.session.AuthCookie,
                            badgecount: badgecount,
                            menubestsellerexits: menubestsellerexits,
                            bestseller: bestseller,
                            Reviews: Reviews,
                            reviewflag: true,
                            commentflag: true
                        })
                    } else {
                        res.render('menu/MainMenu', {
                            isAuthenticated: req.session.AuthCookie,
                            userName: req.session.AuthCookie,
                            menubestsellerexits: menubestsellerexits,
                            bestseller: bestseller,
                            Reviews: Reviews,
                            reviewflag: true,
                            commentflag: true
                        })
                    }
                } else {
                    res.render('User/loginError')

                }
            } //res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });
            else {
                res.render('User/loginErrors')

            }
        });


    });
    app.post("/comments", async(req, res) => {

        var obj = {
            "commnets": req.body.Comment,
            "emailId": req.session.user.profile.emailId
        }
        await ctdata.InsertComments(obj);
        Reviews = await reviewdata.GetreviewsList();

        if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {
            if (badgecount != 0) {
                res.render("menu/MainMenu", {
                    isAuthenticated: req.session.AuthCookie,
                    userName: "",
                    badgecount: badgecount,
                    menubestsellerexits: menubestsellerexits,
                    bestseller: bestseller
                });

            } else {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, userName: "", menubestsellerexits: menubestsellerexits, bestseller: bestseller });
            }

        } else {
            if (badgecount != 0) {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, badgecount: badgecount, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });

            } else {
                res.render("menu/MainMenu", { isAuthenticated: req.session.AuthCookie, commentflag: true, userName: req.session.AuthCookie, bestseller: bestseller, menubestsellerexits: menubestsellerexits, Reviews: Reviews, reviewflag: true });
            }

        }
    })

    app.post("/coupon", async(req, res) => {
        try {
            var obj = {
                    "coupon": req.body.coupon,
                    "emailId": req.session.user.profile.emailId
                }
                // let couponused = await coupondata.GetUsedCouponList(obj)
                //  console.log(req.session);
            menubestsellerexits = false;

            let totalamount = 0.00;
            let amount = 0.00;
            let taxcharge = 3.65;

            OrderBooked.forEach(element => {
                amount += element.Total;
            });
            totalamount = taxcharge + amount;
            let errors = "";
            if (req.body.coupon == "CGCSIJ99C" && amount < 100) {
                errors = "Amount Less then 100 cannot use this coupon."

            } else if (req.body.coupon == "EAT555" && OrderBooked.length < 5) {
                errors = "This Coupon can be used if orders are more then 5 or 5"

            } //else if(couponused ==null ){
            //   errors ="Coupon Can only be used once"
            //   console.log(errors);
            //  }
            else if (req.body.coupon == "CGCSIJ99C" && amount > 100) {

                let disamount = (amount * 15) / 100;
                amount = amount - disamount;
                totalamount = taxcharge + amount;

                TotalAmount = totalamount;

                await InsertForUsedCoupon(obj);


            } else if (req.body.coupon == "EAT555" && OrderBooked.length >= 5) {
                let disamount = (amount * 25) / 100;
                amount = amount - disamount;
                totalamount = taxcharge + amount;

                TotalAmount = totalamount;
                var obj = {
                    coupon: req.body.coupon,
                    emailId: req.session.user.profile.emailId
                }
                await InsertForUsedCoupon(obj);
            }


            const result = await coupondata.GetCouponList();


            if (req.session.AuthCookie == false || typeof req.session.AuthCookie == undefined) {

                if (badgecount != 0) {
                    res.render("menu/OrderBookingPage", {
                        viewTitle: "Your Order",
                        list: OrderBooked,
                        amount: amount,
                        totalamount: totalamount,
                        taxcharge: taxcharge,
                        isAuthenticated: req.session.AuthCookie,
                        userName: "",
                        badgecount: badgecount,
                        menubestsellerexits: menubestsellerexits,
                        Coupon: result,
                        errors: errors,
                        useCoupon: false
                    });
                } else {
                    res.render("menu/OrderBookingPage", {
                        viewTitle: "Your Order",
                        list: OrderBooked,
                        amount: amount,
                        totalamount: totalamount,
                        taxcharge: taxcharge,
                        isAuthenticated: req.session.AuthCookie,
                        userName: "",
                        menubestsellerexits: menubestsellerexits,
                        Coupon: result,
                        errors: errors,
                        useCoupon: false
                    });
                }
            } else {

                if (badgecount != 0) {
                    res.render("menu/OrderBookingPage", {
                        viewTitle: "Your Order",
                        list: OrderBooked,
                        amount: amount,
                        totalamount: totalamount,
                        taxcharge: taxcharge,
                        isAuthenticated: req.session.AuthCookie,
                        userName: req.session.AuthCookie,
                        badgecount: badgecount,
                        menubestsellerexits: menubestsellerexits,
                        Coupon: result,
                        errors: errors,
                        useCoupon: true
                    });
                } else {
                    res.render("menu/OrderBookingPage", {
                        viewTitle: "Your Order",
                        list: OrderBooked,
                        amount: amount,
                        totalamount: totalamount,
                        taxcharge: taxcharge,
                        isAuthenticated: req.session.AuthCookie,
                        userName: req.session.AuthCookie,
                        menubestsellerexits: menubestsellerexits,
                        Coupon: result,
                        errors: errors,
                        useCoupon: true
                    });
                }

            }
        } catch (e) {
            console.log("Session Expire");
        }

    });

    async function InsertForUsedCoupon(req, res) {
        const UsedCouponCollection = await UsedCoupon();

        await UsedCouponCollection.insert(req);
    }






}
module.exports = constructorMethod;