import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  verificationCode: { type: String },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
