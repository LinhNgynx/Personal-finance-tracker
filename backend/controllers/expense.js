const ExpenseSchema= require('../models/ExpenseModels')

exports.addExpense= async (req, res)=>{
    const{title, amount, category, description, date} = req.body
    const expense=ExpenseSchema({
        title, amount, category, description, date
    })
    try {
        if(!title||!date||!category||!description){
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:'Amount has to be a valid number'})
        }
        await expense.save()
        res.status(200).json({message:'Expense Added'})
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
exports.editExpense =async (req,res)=>{
    const {id}=req.params
    const {title, amount, category, description, date}=req.body
    try {
        if(!title||!date||!category||!description){
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount<=0||!amount==='number'){
            return res.status(400).json({message:'Amount has to be a valid number'})
        }
    const updatedExpense= await ExpenseSchema.findByIdAndUpdate(
        id,{
            title, amount, category, description, date
        },{new: true}
    )
    if(!updatedExpense){
        res.status(400).json({message:'Expense not found'})
    }
    res.status(200).json({message:'Expense Updated! '})
    } catch (error) {
        res.status(500).json({message:'Server Error', data: updatedExpense})
    }
}
exports.getExpense = async (req,res)=>{
    try {
        const expenses= await ExpenseSchema.find().sort({createdAt:-1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message:'Server Error'})
    }
}
exports.deleteExpense = async(req, res)=>{
    const{id}=req.params
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense)=>{
        res.status(200).json({message:'Income Deleted'})
     })
     .catch((err)=>{
        res.status(500).json({message: 'Server Error'})
     })
}