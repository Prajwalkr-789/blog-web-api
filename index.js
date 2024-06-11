require('dotenv').config()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const routes = require('./routes/route');
const cors = require('cors');
const blogroute = require('./routes/blogroute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

app.use(express.json({ limit: '2mb' }));
app.use(cookieParser({ limit: '2mb' }));
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use('/user', routes);
app.use('/blog', blogroute);
app.use('/api', routes);
app.get('/', (req, res) => {
    res.json('Jai shree ram');
});

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started and connected to database to ${PORT}...`);
        });
    })
    .catch((err) => {
        console.error("Something happened...", err);
    });

module.exports = app;
