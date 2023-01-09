const express = require('express');
const router = express.Router();
const { autorisation } = require('../middleware/authMiddleware');

router.get("/", (req, res) =>{
    res.render("index.ejs");
});

// creation nouveau compte, formulaire d'inscription
router.get("/inscription", (req, res) =>{
    res.render("inscription.ejs");
});

//formulaire à compléter quand on s'inscrit
router.get("/connexion", (req, res) =>{
    res.render("connexion.ejs");
});

router.get("/accueil", (req, res) =>{
    res.render("accueil.ejs");
});


router.get("/ajouter", (req, res) =>{
    res.render("ajouter.ejs");
});



module.exports = router;