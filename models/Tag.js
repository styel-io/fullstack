const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  tag: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "posts"
      }
    }
  ]
});

module.exports = Tag = mongoose.model("tag", TagSchema);
