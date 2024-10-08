import { Schema, Document, model, models } from 'mongoose';

// Interface for the Project document
export interface IPost extends Document {
  _id: string;
  frenchTitle: string;
  arabicTitle: string;
  frenctText: string;
  arabicText: string;
  imageSource?: string;
  videoSource?: string;
  postCategory: { _id: string; name: string };
  url?: string;
  isInHomepage: boolean;
  createdAt: Date;
  __v?: number;
}

const PostSchema = new Schema({
  frenchTitle: {
    type: String,
    required: true,
  },
  arabicTitle: {
    type: String,
    required: true,
  },
  frenchText: {
    type: String,
    required: true,
  },
  arabicText: {
    type: String,
    required: true,
  },
  imageSource: {
    type: String,
  },
  videoSource: {
    type: String,
  },
  postCategory: {
    type: Schema.Types.ObjectId,
    ref: 'postCategory',
  },
  url: { type: String },
  isInHomepage: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = models?.Post || model('Post', PostSchema);

export default Post;
