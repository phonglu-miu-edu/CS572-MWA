// Deps
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 81;

// Init
const app = express();
mongoose.connect('mongodb://localhost:27017');

// Config
app.disable('x-powered-by');

// Middlewares
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.json());

// Routes
//app.use('/students', studentsRouter);

// Error handlers
app.use((err, req, res, next) => {
    res.status(500).json({error: err});
});

// Bootstrap
app.listen(port, () => console.log(`Backend is listening on port ${port}`));