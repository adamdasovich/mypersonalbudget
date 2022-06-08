const express = require('express');
const app = express();
const envelopes = require('./routes/envelopes.routes')
const cors = require('cors');
const morgan = require('morgan')
const errorhandler = require('errorhandler')

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'));
app.use(errorhandler())

app.use('/api/envelopes', envelopes)


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))