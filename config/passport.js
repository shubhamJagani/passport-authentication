//passport authentication


const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/userModel')

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        console.log("user serialize",user);
        if (user) {
            return done(null, user._id)
        }
        const error = new Error("user not found")
        return done(error)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) return done(null, false)
            // delete user._doc.password
            return done(null, user)

        })
    })

    passport.use('local',new LocalStrategy({
            usernameField: 'email',
        },
        async function (username, password, done) {

            User.findOne({email: username}, function (err, user) {

                if (err) {
                    const error = new Error("error from passport")
                    return done(error);
                }
                if (!user) {
                    return done(null, false, {type:"error",message:"incorrect username"})
                }
                if (user.password !== password) {
                    return done(null, false, {type:"error",message:"incorrect password"})
                }
                return done(null, user);
            });


        }
    ));

}