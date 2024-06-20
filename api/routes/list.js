const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");

//CREATE
router.post("/create", verify, async (req,res)=>{
    if(req.user.isAdmin){
        const newList = new List(req.body);
        try {
            const saveList = await newList.save();
            res.status(201).json(saveList);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to add a list");
    }
})

//DELETE
router.delete("/:id", verify, async (req,res)=>{
    if(req.user.isAdmin){
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("List has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to delete a list");
    }
})

//GET
router.get("/",  async (req,res)=>{
    const type = req.query.type;
    const genre = req.query.genre;
    let list = [];
    
        try {
            if(type){
                if(genre){
                    list = await List.aggregate([
                        {$match : {type: type, genre: genre}},
                        {$sample : {size: 10}}
                    ])
                }
                else{
                    list = await List.aggregate([
                        {$match : {type: type}},
                        {$sample : {size: 10}}
                    ])
                }
            }
            else{
                list = await List.aggregate([{ $sample: {size: 10}}]);
            }
            
            res.status(200).json(list);
        } catch (error) {
            //res.status(500).json(error);
        }
})

module.exports = router;