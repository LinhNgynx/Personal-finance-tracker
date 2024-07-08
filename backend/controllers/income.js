const IncomeSchema= require('../models/IncomeModels')
exports.addIncome= async (req, res)=>{
    const {title, amount, category, description, date} =req.body
    const income=IncomeSchema({
        title, amount, category, description, date
    })
    try {
        if(!title||!category||!description||!date){
            return res.status(400).json({message: 'All fields are required'})
        }
        if(amount<=0 ||!amount ==='number'){
            return res.status(400).json({message: 'Amount must be a positive number'})
        }
        await income.save()
        res.status(200).json({message:'Income Added'})
    } catch (error) {
        console.error(error); // Log the error to the console
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', message: error.message });
    }
    res.status(500).json({ error: 'Server Error', message: error.message });
    }
}
exports.editIncome= async(req,res)=>{
    const {id}=req.params
    const { title, amount, category, description, date } = req.body;
    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (amount <= 0 || typeof amount !== "number") {
            return res
                .status(400)
                .json({ message: "Amount must be a positive number" });
        }
    
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            {
                title,
                amount,
                category,
                description,
                date,
            },
            { new: true }
        );
        if (!updatedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income Updated", data: updatedIncome });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
exports.getIncome = async(req, res)=>{
    try {
        const incomes= await IncomeSchema.find().sort({createdAt:-1})
    res.status(200).json(incomes)
    } catch (error) {
       res.status(500).json({message:'Server Error'}) 
    }
}
exports.deleteIncome = async (req,res)=>{
    const {id}=req.params
    IncomeSchema.findByIdAndDelete(id)
     .then((income)=>{
        res.status(200).json({message:'Income Deleted'})
     })
     .catch((err)=>{
        res.status(500).json({message: 'Server Error'})
     })
}