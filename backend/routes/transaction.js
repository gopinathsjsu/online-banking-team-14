const express = require('express')
const router = express.Router()
const Transactions = require('../models/transactions')

// Getting all
router.get('/', async (req, res) => {
    const transactions = await Transactions.find({})
    res.send(transactions)
})




// Getting one
//router.get('/:id', (req,res) =>{
  //  res.send(req.params.id)
//})
//Creating one.. will use this later
//router.post('/', async (req, res) => {
  //  const newTransaction = new Transaction(req.body)
   // await newTransaction.save()
    //res.send("The transaction was saved")
//})

router.post('/', async (req, res) => {
    const transactions = new Transactions({
        amount: req.body.amount,
        category: req.body.category,
        acc_no: req.body.acc_no
    })
    try{
        const newTransaction= await transactions.save()
        res.status(201).json(newTransaction)
    } catch (err) {
        res.status(400).json({ message: err.message })
      }
    
    //res.send("The transaction was saved")
})


//Updating one
//router.patch('/:id', (req,res) =>{
//})
//Deleting one
//router.delete('/:id', (req,res) =>{
//})

router.delete('/:id', getTransaction, async (req, res) => {
    try{
        await res.transaction.remove()
        res.json({ message: 'Deleted Transaction' })
    }catch (err) {
        res.status(500).json({ message: err.message })
      }
})
async function getTransaction(req, res, next) {
    let transaction
    try {
        transaction = await Transactions.findById(req.params.id)
      if (transaction == null) {
        return res.status(404).json({ message: 'Cannot find transaction' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.transaction = transaction
    next()
  }
    

module.exports = router

