import { Strategy } from "passport-local";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import User from "../models/User";

passport.serializeUser((user, next) => {
    next(null, user);
});

passport.deserializeUser((id, next) => {
    User.findById(id, (err, user) => {
        next(err, user);
    });
});

const localLogin = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, next) => {
    User.findOne({email: email}, (err, user) => {
        if(err){
            return next(err);
        }

        if(!user || !bcrypt.compareSync(req.body.password, user.password,)){
            return next(new Error('Incorrect credentials'));
        }

        return next(null, user);
    });
});

passport.use('localLogin', localLogin);

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
};
