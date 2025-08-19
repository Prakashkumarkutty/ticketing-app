const express = require('express');
const cors = require('cors');

const ticketRoutes = require('./src/routes/ticket.routes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
    res.json({ status: 'OK', message: "Server is running" });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;