const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path') 
const colors = require('colors')
const dotenv = require('dotenv').config()
const errorHandler  = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan("dev"));

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/bills', require('./routes/billsRoutes'))
app.use('api/products', require('./routes/productsRoutes'))
app.use('/api/admins', require('./routes/adminRoutes'))
app.use('/api/subadmins', require('./routes/subadminRoutes'))


//Serve Frontend
if(process.env.NODE_ENV == 'production') {
 app.use(express.static(path.join(__dirname, '../frontend/build')))

 app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../','frontend', 'build', 'index.html')))


} else {
    app.get('/', (req, res) => res.send('Please set to production'))
}



app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

