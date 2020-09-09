const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const objectID = require('mongodb').ObjectID;


const app = express();
const port = 5000;

// read the data of JSON package
const books = require('./data/test_data.json');
for(let i = 0; i < books.length; i++){
    books[i]._id = new objectID(books[i]._id.$oid);
}

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.set('views', './views');
app.set('view engine', 'ejs');

// create a route for each file
const bookRouter = require('./routes/bookRoutes')();
app.use('/books', bookRouter);

//connect to mongodb and insert books into database: bookstore
const url = 'mongodb://localhost:27017';
const dbName = 'bookstore';
(async function mongo(){
    let client;
    try{
        client = await mongoClient.connect(url);
        debug('connect correctly to server');
        const db = client.db(dbName);

        const response = await db.collection('books').insertMany(books);
        console.log(response);
        //res.json(response);
    }catch(err){
        debug(err.stack);
    }
    client.close();
}());

app.get('/', (req, res) => {
    res.render('index', {
        books
    });
});
app.listen(port, () => {
	debug(`listening on port ${chalk.green(port)}`);
});




