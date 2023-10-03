const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


/*
  Route: GET
  To get all of the posts
*/

router.get('', async (req, res) => {
    try {
      const locals = {
        title: "TheReviewer",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let perPage = 5;
      let page = req.query.page || 1;
  
      const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
  
      const count = await Post.count();
      const nextPage = parseInt(page) + 1;
      const hasNextPage = nextPage <= Math.ceil(count / perPage);
  
      res.render('index', { 
        locals,
        data,
        current: page,
        nextPage: hasNextPage ? nextPage : null,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });

/* 
   Route: GET
   To get a single post with an ID
*/

router.get("/post/:id", async (req, res) => {
  try {

    const slug = req.params.id;
    const data = await Post.findById({_id: slug});

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    res.render("post", {locals, data});

  }catch(error) {
    console.log("Error");
  }
});


/* 
   Route: POST
   To search for post from the keywords at search box
*/

router.post("/search", async (req, res) => {
  try {

    const locals = {
      title: "Search",
      description: "Simple Blog created with NodeJs, Express & MongoDb."
    }

    const searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or : [
        {title : {$regex: new RegExp(searchNoSpecialChar, 'i')}},
        {body : {$regex: new RegExp(searchNoSpecialChar, 'i')}},
      ]
    });

    res.render("search", {locals, data});

  }catch(error) {
    console.log("Error");
  }
});


/*function insertPostData () {
      Post.insertMany([
        {
          title: "Call of Duty: Black Ops - A Thrilling Return to the Battlefield",
          body: "Call of Duty: Black Ops is a triumphant return to the series' roots, delivering a thrilling single-player campaign, addictive multiplayer action, and a captivating Zombies mode. While it doesn't reinvent the wheel, it offers a polished and engaging experience that will keep both longtime fans and newcomers hooked for hours on end. If you're a fan of fast-paced, action-packed shooters, this is a must-play title."
        },
        {
          title: "Battlefield 3 - Epic Warfare on a Grand Scale",
          body: "Battlefield 3 is a tour de force in the world of first-person shooters. It excels in delivering massive, cinematic battles with an unparalleled sense of scale and destruction. The multiplayer mode, in particular, is where the game truly shines, offering endless hours of strategic and immersive gameplay. While the single-player campaign may not be as memorable, the overall package makes Battlefield 3 a must-play for fans of military shooters looking for epic, team-based warfare."
        },
        {
          title: "Assassin's Creed III - A Historical Epic with Mixed Results",
          body: "Assassin's Creed III is a bold departure for the series, transporting players to a pivotal moment in American history. The historical immersion, engaging storyline, and improved gameplay mechanics make it a noteworthy addition to the franchise. While it may have suffered from some technical issues upon release, these have largely been addressed, making it a more stable experience. Fans of the series and those interested in historical settings will find much to enjoy, despite some pacing and gameplay quirks."
        },
        {
          title: "Need for Speed: The Run - An Adrenaline-Pumping Cross-Country Race",
          body: "Need for Speed: The Run takes the franchise in an intriguing direction with its narrative-driven approach to racing. The high-stakes story and cinematic presentation make for an adrenaline-pumping experience. However, the game's brevity and limited customization options may leave some players wishing for more depth. If you're a fan of fast-paced, story-driven racing games, The Run is worth a spin, but keep in mind that its focus on storytelling may come at the expense of gameplay variety."
        },
        {
          title: "FIFA 20 - A Beautiful Game, But a Familiar Scoreline",
          body: "FIFA 20 continues the franchise's tradition of delivering a visually stunning and realistic soccer simulation. The addition of Volta Football adds a fun and flashy twist to the gameplay, and the improved AI enhances the authenticity of matches. However, the game might feel like more of the same for those who have followed the series closely over the years. Microtransactions remain a contentious issue for some players, but for soccer enthusiasts looking for the most authentic virtual soccer experience available, FIFA 20 is still the go-to choice."
        },
        {
          title: "Call of Duty 4: Modern Warfare - A Game-Changer in FPS History",
          body: "Call of Duty 4: Modern Warfare is a seminal title that forever changed the landscape of first-person shooters. Its gripping single-player campaign, coupled with the revolutionary multiplayer experience, set new standards for the genre. While its graphics may have aged, its gameplay and impact on the gaming industry endure. For fans of action-packed, military-themed shooters, this is a must-play title that continues to hold a special place in the hearts of gamers worldwide"
        },
        {
          title: "Grand Theft Auto V - A Crime Epic in the Heart of Los Santos",
          body: "Grand Theft Auto V is a monumental achievement in open-world gaming. Its sprawling, meticulously crafted world, compelling characters, and dynamic gameplay make it a true masterpiece. While the mature content and hardware demands may limit its accessibility, for those who can enjoy its immersive and often satirical take on modern society, it offers an unforgettable gaming experience. GTA 5 is not just a game; it's an epic journey through the heart of a criminal underworld."
        },
        {
          title: "Grand Theft Auto: Vice City - A Nostalgic Trip to the Neon '80s",
          body: "Grand Theft Auto: Vice City is a nostalgic trip to a bygone era, capturing the essence of the 1980s with style and flair. The game's memorable protagonist, immersive setting, and exceptional soundtrack make it an enduring classic in the GTA series. While the graphics and controls may show their age, the gameplay and storytelling hold up remarkably well. For those looking to experience the neon-soaked streets of Vice City and relive the '80s, this game remains a must-play, even years after its initial release."
        },
        {
          title: "Rocket League - The Ultimate Fusion of Soccer and Supersonic Cars",
          body: "Rocket League is a gaming phenomenon that brilliantly marries soccer and rocket-powered cars to create a dynamic and exhilarating experience. Its accessibility and skill-based gameplay make it enjoyable for gamers of all levels, while the competitive scene ensures longevity and depth. With constant updates and cross-platform play, Rocket League has solidified its place as a modern multiplayer classic. Whether you're chasing the perfect aerial goal or simply looking for some chaotic fun with friends, this game is an absolute blast."
        }
      ])
    }
    
    //insertPostData(); */

router.get("/about", (req, res) => {
    res.render('about');
});

router.get("/contact", (req, res) => {
  res.render('contact');
});

module.exports = router;