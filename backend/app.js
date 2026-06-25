const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const chartsRouter = require('./routes/chartjs');

app.use(cors());
app.use(express.json());

app.use('/api/charts', chartsRouter);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
