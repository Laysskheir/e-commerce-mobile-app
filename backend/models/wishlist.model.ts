import mongoose, { Schema, Document } from 'mongoose';

export interface WishlistItem extends Document {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WishlistSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true,
  indexes: [
    { fields: { user: 1, product: 1 }, unique: true }
  ]
});

export const Wishlist = mongoose.model<WishlistItem>('Wishlist', WishlistSchema);