// Deps
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRouter = require('./routers/authRouter');
const betRouter = require('./routers/betRouter');
const fileRouter = require('./routers/fileRouter');
const jockeyRouter = require('./routers/jockeyRouter');
const horseRouter = require('./routers/horseRouter');
const raceRouter = require('./routers/raceRouter');

// Init
dotenv.config();

const port = process.env.PORT || 80;
const app = express();
mongoose.connect(process.env.MONGODB);

// Config
app.disable('x-powered-by');

// Middlewares
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/bets', betRouter);
app.use('/files', fileRouter);
app.use('/jockeys', jockeyRouter);
app.use('/horses', horseRouter);
app.use('/races', raceRouter);

// Error handlers
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message || err });
});

// Bootstrap
app.listen(port, () => console.log(`Backend is listening on port ${port}`));