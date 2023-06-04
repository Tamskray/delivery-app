import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  shop: { type: mongoose.Types.ObjectId, required: true, ref: "Shop" },
});

export default mongoose.model("Product", productSchema);
