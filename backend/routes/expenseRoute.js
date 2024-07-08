const expenseRouter=require('express').Router()
const {addExpense, getExpense, deleteExpense, editExpense}=require('../controllers/expense')
expenseRouter.post('/add-expense',addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id',deleteExpense)
    .put('/update-expense/:id', editExpense)
module.exports = expenseRouter