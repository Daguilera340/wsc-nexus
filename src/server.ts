import express from "express";
import path from "path";

const app: express.Application = express();
const port: any = process.env.port || 5000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.render('login', {title: 'This is a test'});
});

app.listen(port);
console.log(`App running on port ${port}`);
