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
    ref: 'PostCategory',
  },
  url: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models?.User || model('User', PostSchema);

export default User;
