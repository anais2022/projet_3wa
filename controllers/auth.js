const express = require('express');
const db = require('../models/bdd-config');

const jwt = require('jsonwebtoken');
//const {body, validationResult} = require('express-validator');
const bcrypt = require("bcryptjs");


exports.inscription = (req, res) =>{
    console.log(req.body);

    const { nom, email, password, passwordConfirm } = req.body;
   

    db.query(`SELECT * FROM users WHERE email = ?`, [email], async (error, results)=>{
        console.log(error)
        console.log(results)
        if(error != null){
            console.log(error);
        }
        if(results.length > 0) {
            return res.render('inscription.ejs', {
            message : "Email déjà utilisé"
            })
        }
        else if (password !== passwordConfirm){
            return res.render('inscription.ejs', {
            message:'les mots de passe ne sont pas identiques'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        db.query(`INSERT INTO users (user_name, email, password) VALUES (?,?,?)`, [nom, email, hashedPassword], async (error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                res.render('connexion', {message:'le compte a bien été créé'});              
            }
        })
    });          
};

exports.connexion = async (req, res) => {
    const { nom, email, password, } = req.body;
    
    db.query(`SELECT id, user_name, password FROM users WHERE email = ?`,[email], (error, results) =>{
        if(results.length != 0){
            console.log(results[0].password)
            bcrypt.compare(password, results[0].password, (err, status) => {
                if (err){
                    res.render('connexion', {message : `L'email et le mot de passe ne correspondent pas`})
                }
                if (status){
                    const token = jwt.sign({ id: results[0].id, user_name: results[0].user_name, email}, process.env.JWT_SECRET, {expiresIn: 360000});
                    res.cookie("access_token", token, {
                        httpOnly: true,
                        maxAge: 360000
                      })
                      res.render('accueil', {message: nom})
                }
                else{
                    res.render('connexion', {message : `L'email et le mot de passe ne correspondent pas`})
                }
            })    
        }
        else{
            console.log(error)
        };            
    })
    
};



exports.deconnexion = (req, res) => {
    res.cookie('jwt', '', {maxAge:1});
    res.render('connexion', {message: 'Vous avez été déconnecté(e)!'})
};