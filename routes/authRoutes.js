const express = require('express');
//const {check, validationResult} = require('express-validator');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/inscription', authController.inscription)

//router.get('/accueil', authController.accueil)  ≈>> pour mon information et ma comprehénsion, car pas de controller. Mais, puis-je en créer un qui insère et affiche le pseudo de la personne qui se connecte sur la page accueil?

router.post('/connexion', authController.connexion)

router.get('/deconnexion', authController.deconnexion)

// ,[
//     check('nom').trim().isAlpha().isLength({ min: 3 }).withMessage('le nom ne comprend pas de chiffre et doit avoir au moins 3 caractères'),
//     check('email').trim().normalizeEmail().toLowerCase(),
//     check('password').trim().isLength({ min:5}).withMessage('le mot de passe doit comprendre au moins 5 caractères'),
//     ]




module.exports = router;