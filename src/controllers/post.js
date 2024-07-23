const Post = require("../models/Post");
const Tag = require("../models/Tag");

const addPost = async (req, res) => {
  try {
    let { title, desc, tags } = req.body;
    const image = req.file
      ? "data:image/gif;base64," + req.file.buffer.toString("base64")
      : null;
    /* */
    tags = JSON.parse(tags);
    if (!Array.isArray(tags)) {
      tags = [];
    }
    // Find existing tags
    const existingTags = await Tag.find({ name: { $in: tags } });
    const existingTagsNames = existingTags.map((tag) => tag.name);
    // Determine new tags to be created
    const newTagsNames = tags.filter(
      (tagName) => !existingTagsNames.includes(tagName)
    );
    // Insert new tags
    const newTags = await Tag.insertMany(
      newTagsNames.map((name) => ({ name }))
    );
    /* */
    const listTags = [...existingTags, ...newTags].map((tag) => tag._id);
    /* */
    const newPost = new Post({ title, desc, image, tags: listTags });
    await newPost.save();
    res.status(201).json({ success: true, message: "success", post: newPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const {
      sortBy = "createdAt",
      order = "desc",
      skip = 0,
      limit = 10,
      keyword,
      tag,
    } = req.query;
    /* */
    const validSortFields = ["createdAt", "title", "desc"];
    if (!validSortFields.includes(sortBy)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid sort field" });
    }
    /* */
    const validOrderValues = ["asc", "desc"];
    if (!validOrderValues.includes(order)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order value" });
    }
    /* */
    const query = {};
    /* */
    if (keyword) {
      query.$or = [
        { title: new RegExp(keyword, "i") },
        { desc: new RegExp(keyword, "i") },
      ];
    }
    /* */
    if (tag) {
      const tagObject = await Tag.findOne({ name: tag });
      if (tagObject) {
        query.tags = {
          $elemMatch: {
            $eq: tagObject._id,
          },
        };
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Tag not found" });
      }
    }
    /* */
    const posts = await Post.find(query)
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip(Number(skip))
      .limit(Number(limit));
    res.status(200).json({ success: true, message: "success", posts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  addPost,
  getPost,
};
