const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/testDB", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


const postSchema = new mongoose.Schema ({
  name: String,
  rating: Number,
  review: String
});

const Post = mongoose.model("Post", postSchema);

const post = new Post ({
  name: "Apple",
  rating: 7,
  review: "Solid crunch, juicy bite"
});

const kiwi = new Post ({
  name: "kiwi",
  score: 10,
  review: "Great fruit"
})

const orange = new Post ({
  name : "Orange",
  score : 6,
  review : "Kinda Sour"
})

const banana = new Post ({
  name : "Banana",
  score : 9,
  review : "Great Stuff"
})

//returns everything in the DB

// Post.find({}, (error, posts) => {
//   console.log(error, posts)
// })

// Find one by ID

// Post.findById("5b309ceca84e99bbb6601904", (error, post) => {
//   console.log(error, post)
// })


// SAVES INTO DB
// post.save();

//Insert many from post db records rather than one

// Post.insertMany([kiwi,orange,banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("success saved fruits to db");
//     }    
// });

// FIND BY ID AND UPDATE OBJECT USES TOP TO GET RID OF DEPRECATION.
// Post.findByIdAndUpdate("5f89509c611a321d347af12b", {
//     name: 'lighthouse' }, (error, post) => {
//         console.log(error, post)
// })

//FIND BY ID AND DELETE
Post.findByIdAndDelete("5f89509c611a321d347af12b"), (error) => {
  console.log(error)
}

// Post.createListing({
//   title: 'My second blog post',
//   description: 'Second Blog post description',
//   content: 'Second Lorem ipsum content.'
// }, (error, post) => {
//   console.logjs(error, post)
// })