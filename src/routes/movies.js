const express = require('express');
const _ = require('underscore');
let router = express.Router();
let movies = require('../Sample.json');
// let test = require("../test.json");
let isEmpty = require('is-empty');
let fs = require('fs');
let path = 'Sample.json';

function saveJSON(filename = "", data = ""){
    return fs.writeFileSync(filename, JSON.stringify(data,null,2));
}

router.get("/",(req,res)=>{
    res.json(movies);
});
router.get("/get",(req,res)=>{
    let json;
    let info = req.query.s;
    if(isEmpty(info)){
        res.send("Se necesita un nombre de la pelicula en el query");
    }else{
       for(let i = 0; i < movies.length; i++){
           if(info === movies[i].title){
               console.log(movies[i]);
               json = movies[i];
           }
           else{
               console.log("no son iguales");
           }
       }
       res.json(json);
    }
});

router.post("/",(req,res)=>{
    const {title, director ,year, rating} = req.body;
    let id = movies.length + 1;
    if(title && director && year && rating){
    const newMovie = {id,...req.body};
    console.log(newMovie);
    movies.push(newMovie);
    saveJSON(path, movies);   
    res.json(movies); 
    }else{
    res.status(500).json({error: 'There was an error.'});
    }
});

router.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {title, director ,year, rating} = req.body;
    if(title && director && year && rating){
    for(let i = 0;i < movies.length;i++){
        if(movies[i].id == id){
            movies[i].title = title;
            movies[i].director = director;
            movies[i].year = year;
            movies[i].rating = rating;
        }
    }
    saveJSON(path,movies);
    res.json(movies);
    }else{
        res.status(500).json({"Error": "Theres have been an error!"});
}
});

router.delete("/:id",(req,res)=>{
    const {id} = req.params;
    for(let i = 0;i<movies.length;i++){
        if(movies[i].id == id){
            movies.splice(i,1);
        }
    }
    res.redirect("/");
});
module.exports = router;