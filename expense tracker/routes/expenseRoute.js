const express = require('express')
const router = express.Router()

const expenseController = require('../controller/expenseController')

router.post('/add', expenseController.createExpense)
router.get('/', expenseController.getAllExpenses)
router.delete('/delete/:id', expenseController.deleteExpense)
router.put('/edit/:id', expenseController.updateExpense)

module.exports = router