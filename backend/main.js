const express = require('express')
const Razorpay = require('razorpay')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors({
	origin: ['http://localhost:4200']
}))

var instance = new Razorpay({
	key_id: 'rzp_test_c5O496hGtgGHO3',
	key_secret: 'f74eodjW0Gm4PH9p6Tp4xbcG'
})

app.post('/create-order', async (req, res) => {
	const order = await instance.orders.create({
		amount: req.body.amount,
		currency: req.body.currency
	})
	res.send(order)
})

app.listen(3000, () => {
  console.log('server started')
})
