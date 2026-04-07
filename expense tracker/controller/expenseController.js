const Expense = require('../models/expenseModel');
const createExpense= async (req, res) => {
    try {
        const { amount, description, category } = req.body;
        if(!amount || !description || !category){
            return res.status(400).json({ error: 'All fields are required' });
        }
        const expense = await Expense.create({ amount, description, category });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add expense' });
    }
};

const getAllExpenses= async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve expenses' });
    }
};

const deleteExpense= async (req, res) => {
    try {
        const id = req.params.id;
       
        await Expense.destroy({ where: { id } });
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};

const updateExpense= async (req, res) => {
    try {
        const id = req.params.id;
        const { amount, description, category } = req.body;
        if(!amount || !description || !category){
            return res.status(400).json({ error: 'All fields are required' });
        }
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense not found' });
        }
        expense.amount = amount;
        expense.description = description;
        expense.category = category;
        await expense.save();
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update expense' });
    }
};


module.exports = {
        createExpense,
        getAllExpenses,
        deleteExpense,
        updateExpense
};
