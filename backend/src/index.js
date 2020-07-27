const express = require('express');
const cors = require('cors');
const routes = require('./routes')
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes); //sempre depois do app.use...express.json ;
app.listen(3333);