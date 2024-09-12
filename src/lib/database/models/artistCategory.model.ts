import { Document, Schema, model, models } from 'mongoose';

export interface IArtistCategory extends Document {
  _id: string;
  name: string;
}

const ArtistCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const ArtistCategory =
  models.ArtistCategory || model('ArtistCategory', ArtistCategorySchema);

export default ArtistCategory;
