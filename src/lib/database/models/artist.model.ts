import { Schema, Document, model, models } from 'mongoose';

// Interface for the Artist document
export interface IArtist extends Document {
  _id: string;
  frenchTName: string;
  arabicName: string;
  frenctText: string;
  arabicText: string;
  imageSource?: string;
  videoSource?: string;
  artistCategory: { _id: string; name: string };
  url?: string;
  createdAt: Date;
  __v?: number;
}

const ArtistSchema = new Schema({
  frenchName: {
    type: String,
    required: true,
  },
  arabicName: {
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
  artistCategory: {
    type: Schema.Types.ObjectId,
    ref: 'artistCategory',
  },
  url: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Artist = models?.Artist || model('Artist', ArtistSchema);

export default Artist;
