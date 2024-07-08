const incomeRouter=require('express').Router()
const {addIncome, getIncome, deleteIncome, editIncome}=require('../controllers/income')
incomeRouter.post('/add-income',addIncome)
    .get('/get-incomes', getIncome)
    .delete('/delete-incomes/:id',deleteIncome)
    .put('/update-income/:id', editIncome)
module.exports = incomeRouter