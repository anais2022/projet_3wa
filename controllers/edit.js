const express = require('express');
const db = require('../models/bdd-config');
const fileupload = require('express-fileupload');
let Event = require('../models/eventModel')

const all_events = (req, res) => {

   db.query(`SELECT * FROM events ORDER BY id DESC LIMIT 10`, (error, results) =>{
    
        if(error){
            console.log(error)
        }
        else{
            console.log(results)
    
            res.render('all-events', {results:results});
        }
    })

};


const new_event = (req, res) => {
    
    let visuel;
    let uploadPath = __dirname + "/client/images/img_events/";
   
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send('aucun fichier téléchargé.')
    }

    visuel= req.files.visuel;
    visuel.mv(uploadPath + visuel.name, (err)=>{
        console.log('erreur upload image : ' + err)
    });
    
    const { titre, concept,} = req.body;

    db.query(`INSERT INTO events (theme, details, image) VALUES (?,?,?)`,
    [titre, concept, '/images/img_events/'+visuel.name], (error, results) =>{
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            return res.redirect('/edit/all-events')
        }
    });


};


// selectionner un seul événement sur la base de son id
const event_details = (req, res) => {
    let id= req.params.id;

    db.query("SELECT * FROM events where id = ?", id, (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.render('event', {event : {"id": result[0].id, "theme" : result[0].theme, "details" : result[0].details}});
        }
    });
    
   
};

// modification d'un event existant
const event_update = (req, res) => {
    
    const { id, titre, concept} = req.body;

    db.query("UPDATE events SET theme = ?, details = ? WHERE id = ?", [titre, concept, id], (error, result)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect('all-events');
        }
    });
    
   
};


// router.delete('/:id', editController.delete)
const delete_event = (req, res) => {

    const id = req.params.id;

    db.query("DELETE FROM events where id = ? ", id, (error, results)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/edit/all-events');
        }
    });

};


module.exports = {
   all_events,
    new_event,
    event_details,
    event_update,
    delete_event
}