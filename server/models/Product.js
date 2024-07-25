import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  // shop: { type: mongoose.Types.ObjectId, required: true, ref: "Shop" },
  shop: { type: String, required: true, ref: "Shop" },
});

export default mongoose.model("Product", productSchema);
