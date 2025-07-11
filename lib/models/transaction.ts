import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: {type:String}
});

export const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);