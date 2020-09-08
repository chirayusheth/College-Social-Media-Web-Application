const LocalStrategy = require('passport-local').Strategy
let User = require('../models/User.model');
let ClubCom = require('../models/ClubCom.model');
const bcrypt = require('bcryptjs');

module.exports = passport => {
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        ClubCom.findOne({ username: username })
            .then(clubcom => {
                if (clubcom == null) {
                    User.findOne({ username: username })
                        .then(user => {
                            if (user == null) {
                                return done(null, false, { msg: 'Username does not exist' });
                            }
                            else if (!bcrypt.compareSync(password, user.password)) {
                                return done(null, false, { msg: 'The password is incorrect' });
                            }
                            else {
                                return done(null, user);
                            }
                        })
                        .catch(err => { console.log('Passport Error: ' + err); return done(err) });
                }
                else if (!bcrypt.compareSync(password, clubcom.password)) {
                    return done(null, false, { msg: 'The password is incorrect' });
                }
                else {
                    return done(null, clubcom);
                }
            })
            .catch(err => { console.log('Passport Error: ' + err); return done(err); })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.username)
    })

    passport.deserializeUser((username, done) => {
        const err = null
        ClubCom.findOne({ username: username })
            .then(clubcom => {
                if (clubcom == null) {
                    User.findOne({ username: username })
                        .then(user => {
                            if (user == null) {
                                err = 'User not found!';
                                done(err,null);
                            }
                            else {
                               // console.log(user)
                                done(err,user);
                            }
                        })                        
                        .catch(err => console.log('Passport Error: ' + err))
                }
                else {
                    done (err,clubcom);
                }
            })
            .catch(err => console.log('Passport Error: ' + err))
    })
}