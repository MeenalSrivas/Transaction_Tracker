import { NextRequest } from "next/server";
import { connectDB } from '../../../../lib/mongodb';
import {Transaction} from '../../../../lib/models/transaction';

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;
  await Transaction.findByIdAndDelete(id);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
 
}
