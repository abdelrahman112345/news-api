const express = require("express");
const router = express.Router();
const News = require("../models/news");
const auth = require("../middleware/auth");
const multer = require("multer");
const timestamp = require("time-stamp");

router.post("/news", auth, async (req, res) => {
  try {
    const News = new News({
      ...req.body,
      createdAt: timestamp(),
      publisher: req.journalist._id,
    });

    await np.save();
    res.send(np);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/news/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findOne({ _id: id, publisher: req.journalist._id });
    if (!news) {
      return res.send("No newspaper is found");
    }
    res.send(news);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/news/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id;
    const news = await News.findOneAndUpdate(
      { _id, publisher: req.journalist._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!news) {
      return res.send("No newspaper is found");
    }
    res.send(news);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/news/:id", auth, async (req, res) => {
  try {
    const idNews = req.params.id;
    const news = await News.findOneAndDelete({
      _id: idNews,
      publisher: req.journalist._id,
    });
    if (!news) {
      return res.send("No newspaper is found to delete");
    }
    res.send(news);
  } catch (e) {
    res.send(e.message);
  }
});

const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)) {
      return cb(new Error("Please uplaod image"), null);
    }
    cb(null, true);
  },
});
router.post(
  "/newsImage/:id",
  auth,
  upload.single("newsImage"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const news = await News.findOne({ _id: id, publisher: req.journalist._id });
      if (!news) {
        return res.send("No newspaper is found");
      }
      news.image = req.file.buffer;
      await news.save();
      res.send();
    } catch (e) {
      res.send(e.message);
    }
  }
);

module.exports = router;
