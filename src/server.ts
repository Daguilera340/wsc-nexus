import express from "express";
import path from "path";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import loginRouter from "./routes/login";
import randomRouter from "./routes/random";
import * as passportConfig from "./config/passport";

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/node-ts', (err) => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log('Connected to MongoDB');
});

const app: express.Application = express();
const port: any = process.env.port || 5000;


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'wsc-nexus-secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', passportConfig.isAuthenticated);
app.use('/login', loginRouter);
app.use('/random', passportConfig.isAuthenticated, randomRouter);

app.use((err, req, res, next) => {
    res.render('error', {message: err.message});
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
