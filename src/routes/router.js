const express = require("express");
let router = express.Router();

router.get('/', (req,res)=>{
    let obj = {
        "Hola": "Un hola jsoneado",
        "Perro": "Whisky"
    }
    res.json(obj);
});

module.exports = router;