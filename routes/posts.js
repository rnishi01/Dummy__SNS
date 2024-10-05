const router = require("express").Router();

router.get("/", (req,res) =>{
    res.send("poata router");
});

module.exports = router;

