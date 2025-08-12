import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, sparse: true }, // becomes known after payment
  invoiceNumber: { type: String, index: true },
  email: { type: String, required: true, index: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true }, // initiated, pending, settled, declined, error, unknown
  rawData: { type: Object },
  notified: { type: Boolean, default: false }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);
