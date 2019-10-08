import express from "express";

const router: express.Router = express.Router();

router.get('/', (req, res, next) => {
    const user: any = req.user;

    if(user.email === 'nexus.dan') {
        res.render('another-random');
        return;
    }

    if(user.email === 'sara.gg'){
        res.render('bday');
        return;
    }

   res.render('random');
});

export default router;
