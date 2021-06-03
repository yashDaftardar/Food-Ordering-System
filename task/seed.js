const dbConnection = require('../DbConnection/MongoDbConnection');
const data = require('../data/');
const menu = data.menu;
const user = data.user;
const coupon = data.coupon;
const main = async() => {
    const db = await dbConnection();
    await db.dropDatabase();
    await menu.addmenu('Chicken Cripsy', 'Deep fried shreded chicken ', 'Starters', '$20');
    await menu.addmenu('Chicken Lolipop', 'Deep fried chicken ', 'Starters', '$15');
    await menu.addmenu('Chicken 65', 'Spicy, deep-fried chicken dish', 'Starters', '$28');
    await menu.addmenu('Prawns Koliwada', 'Deep fried prawns', 'Starters', '$25');

    await menu.addmenu('Sweet Potatoes', 'Thick chunks of sweet potato are roasted', 'Sides', '$20');
    await menu.addmenu('Lemon-Ginger Spinach', 'More spinach than you think you need', 'Sides', '$15');
    await menu.addmenu('Roasted  Broccoli', 'Roast broccoli shower of grated Parm', 'Sides', '$28');



    await menu.addmenu('Glazed Chicken', 'Grilled chicken in sweet blackberry glaze', 'Main Course', '$20');
    await menu.addmenu('One Pot Chicken', 'Chicken in this spin on a classic dish', 'Main Course', '$15');
    await menu.addmenu('Chicken Skewers', 'Coconut and red chili-marinated chicken', 'Main Course', '$28');
    await menu.addmenu('Chicken Pizza', 'Pizza with  chicken.', 'Main Course', '$25');


    await menu.addmenu('Gajar Ka Halwa', 'Simple Indian Dessert with Carrots', 'Desserts', '$20');
    await menu.addmenu('Mysore Pak', 'A fudge-like sweet, having ghee', 'Desserts', '$15');
    await menu.addmenu('Gulab Jamun', 'Ball-shaped sweet', 'Desserts', '$28');
    await menu.addmenu('Rasgulla', 'A syrupy ball-shaped, spongy', '$25');

    await user.addUserData('kalli007kalli@gmail.com', 'kallikalli007@kalli007', '5512602020', '123 Superhero avenue apart 1');

    await coupon.Coupondetails("Get 25% off", 'EAT555', "Order any 5 times and get 25% off", "");
    await coupon.Coupondetails("Get 15% off", 'CGCSIJ99C', "Order above 100 and get 15% off", "");

    console.log('Done seeding database');
    await db.serverConfig.close();
};

main().catch(console.log);