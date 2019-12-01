const express = require('express');
const Contact = require('../models/Contact');
const router = new express.Router();

router.get('/', async(req,res)=>{
    try{
        const contacts = await Contact.find({});
        // console.log(contacts);
        res.render("viewContacts",{contacts});
    }
    catch(e){
        // res.status(500).send(e);
    }
})

router.get('/add',async(req,res)=>{
    res.render("addUpdate",{
        title:"ADD CONTACT",
        type:"show"
    });
})

router.get('/view/:id',async(req,res)=>{
    try{
        const data = await Contact.find({_id:req.params.id});
        res.render("addUpdate",{contact:data[0],type:"none"});
    }
    catch{
        console.log("cant find");
    }
})

router.get('/update/:id',async(req,res)=>{
    const data = await Contact.find({_id:req.params.id});
    res.render("addUpdate",{
        contact:data[0],
        title:"UPDATE CONTACT",
        type:"show"
    });
})

router.get('/delete/:id', async(req,res)=>{
    try{
        const contact = await Contact.findOneAndDelete({_id:req.params.id});
        res.redirect("/");
    }
    catch (e) {
        console.log("cant find");
    }
})

router.post('/contact', async(req,res)=>{
   if (req.body._id == "" ){
       addNewContact(req,res);
   }
   else{
        updateContact(req,res);
   } 
})

const addNewContact = async(req,res) => {
    const contact = new Contact();
    contact.name = req.body.name;
    contact.phone = req.body.phone;
    contact.work = req.body.work;
    contact.email = req.body.email;

    try{
        await contact.save();
        res.redirect("/");
    }
    catch(e){
        console.log(e);
    }
}

const updateContact= async(req,res)=>{
    try {
        await Contact.findByIdAndUpdate({_id:req.body._id},req.body);
        res.redirect("/");
    }
    catch(e){
        console.log(e);
    }
}
    

module.exports = router;