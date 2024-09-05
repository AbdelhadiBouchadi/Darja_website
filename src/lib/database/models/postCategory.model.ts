import { Document, Schema, model, models } from 'mongoose';

export interface IPostCategory extends Document {
  _id: string;
  name: string;
}

const PostCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const PostCategory =
  models.PostCategory || model('PostCategory', PostCategorySchema);

export default PostCategory;
