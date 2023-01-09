const express = require('express');
//const path = require('path');
const router = express.Router();

const editController = require('../controllers/edit');



//créer et publier un nouvel événement
router.post('/ajouter', editController.new_event)

//HP des evenements
router.get('/all-events', editController.all_events)

//appeler la page de création d'événéments
//router.get('/ajouter', editController.ajouter)


//accéder aux détails d'un événement
router.get('/all-events/:id', editController.event_details)

// //modifier un événement
router.post('/event-update', editController.event_update)


// //supprimer un événement
// router.delete('/all-events/:id', editController.delete_event)
router.get('/event-deleted/:id', editController.delete_event)


module.exports = router;