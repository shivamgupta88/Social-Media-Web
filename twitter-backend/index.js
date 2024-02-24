const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();

// connect to db
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected"));



mongoose.connection.on("error", err => {
    console.log(`DB connection error: ${err.message}`);
});

// import routes
const authRoutes = require('./routes/auth');
const homeRoutes=require('./routes/home');
const tweetRoutes=require('./routes/tweet')
const commentRoutes = require('./routes/comments');
// const nestedCommentRoutes = require('./routes/nestedcomments');


app.get('/', (req, res) => {
    res.send('Hello from Node API');
});

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); 


// middleware
app.use('/api', authRoutes);
app.use('/api',homeRoutes);
app.use('/api',tweetRoutes);
app.use('/api', commentRoutes);
// app.use('/api', nestedCommentRoutes);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});

module.exports = app