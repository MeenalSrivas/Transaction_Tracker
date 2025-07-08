import {NextResponse, NextRequest } from "next/server";
import { connectDB } from '../../../../lib/mongodb';
import {Transaction} from '../../../../lib/models/transaction';


export async function DELETE(
  request: NextRequest,
  { params }: { params:  Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } =  await params;
    
    const result = await Transaction.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, message: "Transaction deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Failed to delete transaction:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
