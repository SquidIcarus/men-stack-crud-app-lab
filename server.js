const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const morgan = require("morgan");

const app = express();


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
});

const Wine = require('./models/wine.js'); 

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev")); 

//GET

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get("/wines", async (req, res) => {
    const allWines = await Wine.find();
    res.render("wines/index.ejs", { wines: allWines });
});

app.get('/wines/new', (req, res) => {
    res.render('wines/new.ejs');
});

app.get('/wines/:wineId', async (req, res) => {
    const foundWine = await Wine.findById(req.params.wineId);
    res.render("wines/show.ejs", { wine: foundWine });
});

app.delete("/wines/:wineId", async (req, res) => {
    await Wine.findByIdAndDelete(req.params.wineId);
    res.redirect("/wines");
});

// POST

app.post("/wines", async (req, res) => {
    try {
        const newWine = new Wine({
            vineYard: req.body.vineYard,
            name: req.body.name,
            type: req.body.type,
            region: req.body.region,
            country: req.body.country,
            year: req.body.year,
            tastingNotes: req.body.tastingNotes,
            foodPairings: req.body.foodPairings
        });

        await Wine.create(req.body);
        res.redirect("/wines/new");
    } catch (err) {
        console.error("Error saving wine", err);
        res.status(500).send("Error saving wine to database");
    }
});

app.listen(3000, () => {
    console.log('I hear you port 3000')
});