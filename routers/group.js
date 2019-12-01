const express = require('express');
const Group = require('../models/Group');
const Contact = require('../models/Contact');
const router = new express.Router();

router.get('/groups', async(req,res)=>{
    try{
        const groups = await Group.find({});
        res.render("viewGroup",{groups});
    }
    catch(e){
       console.log(e);
    }
})

router.get('/groupContacts/:id',async(req,res)=>{
    try{
        const groupContact = await Group.find({_id:req.params.id});
        let contacts = groupContact.toString();
        res.render("viewGroup",{contacts})
    }
    catch(e){
        console.log(e);
    }
})


router.get('/newGroup', async(req,res)=>{
    try{
        const contacts = await Contact.find({});
        res.render("newGroup",{contacts});
    }
    catch(e){
        console.log(e);
    }
})

router.post('/newGroup',async(req,res)=>{
    try{
        const group = new Group();
        group.group = req.body.group;
        let contact = req.body.contacts;
        if(req.body.contacts[0].length>1){
            req.body.contacts.forEach(contact => {
             group.contacts = group.contacts.concat({contact}); });
        }  
        else{
            group.contacts = group.contacts.concat({contact});
        }
        if(group){
            await group.save();
            res.redirect('/groups');
        }
        else{
            console.log("no")
        }
    }
    catch(e){
        console.log(e);
    }
})

module.exports = router;