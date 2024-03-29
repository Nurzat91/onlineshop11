import {Schema, model, Types} from "mongoose";
import Category from "./Category";


const ProductSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value >= 0,
        message: 'Price cannot be negative!',
      }
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const category = await Category.findById(value);
          return Boolean(category);
        },
        message: 'Category does not exist!',
      }
    },

});
const Product = model('Product', ProductSchema);

export default Product;