import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  // address:
  // rating:
  // message
  // work time
  image: { type: String, required: false },
  info: { type: String, required: true },
  deliveryMinCost: { type: Number, required: true },
  deliveryTime: { type: Number, required: true },
  products: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      default: [],
      ref: "Product",
    },
  ],
});

export default mongoose.model("Shop", shopSchema);
