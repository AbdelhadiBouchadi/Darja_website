import { Schema, Document, model, models } from 'mongoose';

// Interface for the Project document
export interface IPost extends Document {
  _id: string;
  frenchTitle: string;
  arabicTitle: string;
  frenctText: string;
  arabicText: string;
  images: string[];
  videoSource?: string;
  postCategory:
    | 'mercredi 04.12'
    | 'jeudi 05.12'
    | 'vendredi 06.12'
    | 'samedi 07.12'
    | 'dimanche 08.12'
    | null;
  horaire: string;
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
  images: {
    type: [String],
    default: [],
  },
  videoSource: {
    type: String,
    required: false,
  },
  postCategory: {
    type: String,
    enum: [
      'mercredi 04.12',
      'jeudi 05.12',
      'vendredi 06.12',
      'samedi 07.12',
      'dimanche 08.12',
    ],
    required: false,
    default: null,
  },
  horaire: { type: String },
  url: { type: String, required: false },
  isInHomepage: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = models?.Post || model('Post', PostSchema);

export default Post;
