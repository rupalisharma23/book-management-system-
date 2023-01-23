const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Book = require('./models/books');
const routes = require('./routes/routes');


// connect to mongodb

const connection = 'mongodb+srv://rupali:rupali@cluster0.0vjkszt.mongodb.net/practice?retryWrites=true&w=majority';

mongoose.connect(connection).then((result) => {
    app.listen(3000)
    console.log('connect to db')
}).catch((error) => { console.log(error) })

app.use(express.json());
app.use('/api', routes)

// to add book hardcoded
routes.get('/add-book', (req, res) => {
    const book = new Book({
        name: 'history',
        price: '30 rs'
    });
    book.save().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

// get all list of book from the database
routes.get('/bookList', (req, res) => {
    Book.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
})

// get a single book based on id hardCoded

routes.get('/single-book', (req, res) => {
    Book.findById('63ceb72bb5ad749e3a99246c').then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

// add books post request

routes.post('/addBooks', async (req, res) => {
    const data = new Book({
        name: req.body.name,
        price: req.body.price
    })

    try {

        const dataToSave = await data.save();
        res.status(200).json(dataToSave)

    }

    catch (error) {
        res.status(400).json({ message: error.message })

    }

})

// find book by id (not harcoded)

routes.get('/getById/:id', async (req, res) => {
    // when using try catch it is nessasary to use async await othrwise it will not work
    try {
        const data = await Book.findById(req.params.id)
        res.status(200).json(data)
    }

    catch (err) {
        res.status(400).json({ message: err.message })
    }

    // second method

    // Book.findById(req.params.id).then((result)=>{
    //     res.status(200).json(result)
    // }).catch((err)=>{
    //     res.status(400).json({message:err.message})
    //     })

})

// update data by id
routes.put('/update/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Book.findByIdAndUpdate(id, updatedData, options)
        res.status(200).json(result)
    }

    catch (err) {
        res.status(400).json({ message: err.message })
    }


})

// delete a user by id
routes.delete('/delete/:id', async (req, res) => {

    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id)
        res.status(200).send(`book with name ${result.name} deleted successfully`)
    }

    catch (err) {
        res.status(400).json({ message: err.message })
    }


})
