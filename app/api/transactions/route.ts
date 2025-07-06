import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import {Transaction} from '../../../lib/models/transaction';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req:Request) {
  await connectDB();
  const body = await req.json();
  console.log("Received new transaction:", body);console.log("Received new transaction:", body);
  const newTx = await Transaction.create(body);
  return NextResponse.json(newTx, { status: 201 });
}
