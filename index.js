const express = require('express');
const cors = require('cors');
const getContributions = require('./api/getContributions');

const app = express();

//  Middleware
app.use(cors());
app.use(express.json())

app.use('/api/', getContributions)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Server running on port: ${port}`));

