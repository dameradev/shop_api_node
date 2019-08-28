const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  formData: {
    address: { type: String },
    name: { type: String }
  },
  items: [
    {
      type: Object
    }
  ]

  // user: {
  //   email: {
  //     type: String,
  //     required: true
  //   },
  //   userId: { type: Schema.Types.ObjectId, required: true, ref: "User" }
  // }
});

module.exports = mongoose.model("Order", orderSchema);
