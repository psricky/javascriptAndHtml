const express = require('express')
const app = express()
const db=require('./config/db')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public', {index: 'index.html'}))

const expenseRoute=require('./routes/expenseRoute')


app.use('/api/expenses', expenseRoute)

db.sync({ force: false }).then(() => {

    app.listen(3000, () => {
        console.log('Server connected to port')
    })
}).catch((error) => {
    console.log(error)
})
