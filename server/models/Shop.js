import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  //   address:
  // rating:
  image: { type: String, required: false },
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
