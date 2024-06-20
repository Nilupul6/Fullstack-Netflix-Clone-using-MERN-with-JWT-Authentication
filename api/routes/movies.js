const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE
router.post("/create", verify, async (req,res)=>{
    if(req.user.isAdmin){
        const newMovie = new Movie(req.body);
        try {
            const saveMovie = await newMovie.save();
            res.status(201).json(saveMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to add Movie");
    }
})

//UPDATE
router.put("/:id", verify, async (req,res)=>{
    if(req.user.isAdmin){
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true});
            res.status(201).json(updatedMovie);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to Update Movie");
    }
})

//DELETE
router.delete("/:id", verify, async (req,res)=>{
    if(req.user.isAdmin){
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else{
        res.status(403).json("You are not allowed to delete Movie");
    }
})

//GET
router.get("/find/:id",  async (req,res)=>{
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(500).json(error);
        }
    
})

//GET RANDOM
router.get("/random/one",  async (req,res)=>{
    const type = req.query.type;
    let movie;
        try {
            if(type === "series"){
                movie = await Movie.aggregate([
                    {$match: {isSeries: true}},
                    {$sample: { size:1}}
                ]);
            }else{
                movie = await Movie.aggregate([
                    {$match: {isSeries: false}},
                    {$sample: { size:1}}
                ]); 
            }
            
            res.status(200).json(movie);
        } catch (error) {
            //res.status(500).json(error);
        }
})

//GET ALL
router.get("/",  async (req,res)=>{
        try {
            const movies = await Movie.find();
            res.status(200).json(movies.reverse());
        } catch (error) {
            res.status(500).json(error);
        }
})






module.exports = router;