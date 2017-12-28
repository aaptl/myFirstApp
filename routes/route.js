var express = require('express')
var router = express.Router()

const Contact = require('../model/contact')

router.get('/contacts',(req,res,next)=>{
    Contact.find(function(err,contacts){
        res.json(contacts)
    })
  //  res.send('retriving the contact')
})

router.post('/contact',(req,res,next)=>{
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    })
    newContact.save((err,contact)=>{
        if(err)
        {
            res.json({msg:'failed to add contact'})
        }
        else
        {
            res.json({msg:'contact added successfully'})
        }
    })
})

router.delete('/contact/:id',(req,res,next)=>{
    Contact.remove({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json({msg:'failed to remove contact'})
        }
        else
        {
            res.json({msg:'contact removed '})
        }
    })

})
module.exports=router;