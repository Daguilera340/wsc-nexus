import express from "express";
import passport from "passport";

const router: express.Router = express.Router();

router.get('/', (req, res, next) => {
   res.render('login');
});

router.post('/', passport.authenticate('localLogin' , {
   successRedirect: '/random'
}));

export default router;
