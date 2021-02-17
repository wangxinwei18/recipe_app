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
var targetSubscriber;
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
        console.log(`Created User: ${user}`);
    })
    .then(() => {
        return Subscriber.findOne({
            email: testUser.email
        });
    })
    .then(subscriber => {
        targetSubscriber = subscriber;
        console.log(`The User link the subscriber: ${targetSubscriber}`);
    })
    .catch(error => console.log(error.message));

