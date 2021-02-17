const subscriber = require("./models/subscriber");

const mongoose = require("mongoose"),
    { Schema } = mongoose,
    User = require("./models/user");
Subscriber = require("./models/subscriber");

mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);

var testUser;
User.create({
    name: {
        first: "Jon",
        last: "Wexler"
    },
    email: "jon@jonwexler.com",
    password: "pass123"
})
.then(user => {
    testUser = user;
    return Subscriber.findOne({
        email: user.email
    });
})
.then(subscriber => {
    testUser.subscribedAccount = subscriber;
    testUser.save()
    .then(user => console.log("user updated"));
})
.catch(error => console.log(error.message));