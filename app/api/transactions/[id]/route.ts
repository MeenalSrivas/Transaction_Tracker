import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import {Transaction} from '../../../../lib/models/transaction';

export async function DELETE(_: Request, { params }: { params: { id:string } }) {
  await connectDB();
  await Transaction.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
