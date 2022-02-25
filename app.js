const mongoose = require('mongoose');

////database connection 
mongoose.connect('mongodb://127.0.0.1:27017/mymongodb1', {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log("connection successfull..."))
.catch((err) => console.log(err));


/////insert document
const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    ctype : String,
    videos : Number,
    active : Boolean,
    date : {
        type:Date,
        default: Date.now
    }
})
const playlist = new mongoose.model("playlist", playlistSchema);

const  createDocument = async () =>{
    try{
        const nodePlaylist = new playlist({
            name: "Node Js",
            ctype: "Back end",
            videos: "37",
            active: true
          })

          const reactPlaylist = new playlist({
            name: "React Js",
            ctype: "Front end",
            videos: "47",
            active: true
          })

          const mongoosePlaylist = new playlist({
            name: "Mongoose",
            ctype: "Front end",
            videos: "87",
            active: true
          })
          const result = await playlist.insertMany([nodePlaylist, reactPlaylist, mongoosePlaylist]);
         //const result = await reactPlaylist.save();
         console.log(result);
    }catch(err){
        console.log(err);
    }

};

//createDocument();
// const getDocument = async () =>{
//    const result = await playlist.find({ctype: "Front end"})
//    .select({name:1})
//    .limit(1);
//    console.log(result);
// }

//get document 
const getDocument = async () =>{
   // $gte $in $gt :80 graterthan
   //$nin :["Back End", "Database"]
    const result = await playlist.find({video: {$lte :80 }})
    .select({name:1});
    console.log(result);
 }
 
//getDocument();
const updateDocument = async (_id) =>{
    try{
        const result = await playlist.findByIdAndUpdate({_id}, {
            $set : {
                name : "Javascript Back Test"
            }
            }, {
             new :true,
             useFindAndModify : false
            });
        console.log(result);
    }catch(err){
        console.log(err);
    }
     
  }
  
 //updateDocument("61e58f36ff4eb61d686d20f8");

 ///delete document
 // deleteOne
 const deleteDocument = async (_id) =>{
    try{
        const result = await playlist.findByIdAndDelete({_id : _id});
        console.log(result);
    }catch(err){
        console.log(err);
    }
     
  }
  
 deleteDocument("61e591c04e8c6ebcaf4371f3");