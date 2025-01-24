
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(bodyParser.json());
app.use(cors());


let blogs = [];


app.get("/blogs", (req, res) => {
  res.status(200).json({ success: true, blogs });
});


app.post("/blogs", (req, res) => {
  const { title, content, walletAddress } = req.body;


  if (!title || !content || !walletAddress) {
    return res.status(400).json({
      success: false,
      message: "Title, content, and wallet address are required.",
    });
  }

 
  const newBlog = { id: blogs.length + 1, title, content, walletAddress };
  blogs.push(newBlog);

  res.status(201).json({
    success: true,
    message: "Blog added successfully.",
    blog: newBlog,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

