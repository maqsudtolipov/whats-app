const express = require('express');
const dotEnv = require('dotenv')
const mongoose = require('mongoose');

dotEnv.config({path: './.env'})

const app = express();


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASS);
mongoose.connect(DB).then(() => console.log('☁️  Database connection successful!'))

app.get('', (req, res) => {
	res.json({
		success: 'success',
		message: 'Hello there'
	})
})

app.listen(process.env.PORT || 8000, () => {
	console.log(`⛵️ Listening on port ${process.env.PORT || 8000}`);
})