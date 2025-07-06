// /app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface Transaction {
  _id?: string;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<Transaction>({
    description: "",
    amount: 0,
    date: "",
    type: "income",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  const handleSubmit = async () => {
    if (!form.description || !form.amount || !form.date) return;
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
      
    });
    setForm({ description: "", amount: 0, date: "", type: "income" });
    fetchTransactions();
    console.log("Submitting form", form);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const income = transactions.filter((t) => t.type?.toLowerCase() === "income").reduce((acc, cur) => acc + cur.amount, 0);
  const expenses = transactions.filter((t) => t.type?.toLowerCase() === "expense").reduce((acc, cur) => acc + cur.amount, 0);
  const balance = income - expenses;

  const monthlyData = Array.from(
    transactions.reduce((acc, curr) => {
      const month = format(new Date(curr.date), "MMM yyyy");
      const item = acc.get(month) || { month, income: 0, expense: 0 };
      item[curr.type === "income" ? "income" : "expense"] += curr.amount;
      acc.set(month, item);
      return acc;
    }, new Map()).values()
  );

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-purple-600">Transaction Tracker</h1>
      <p className="text-center text-muted-foreground mb-6">Manage your finances with ease</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="bg-green-500 text-white">
          <CardContent className="p-4">
            <p>Total Balance</p>
            <h2 className="text-2xl font-bold">{balance.toFixed(2)}</h2>
          </CardContent>
        </Card>
        <Card className="bg-blue-500 text-white">
          <CardContent className="p-4">
            <p>Total Income</p>
            <h2 className="text-2xl font-bold">{income.toFixed(2)}</h2>
          </CardContent>
        </Card>
        <Card className="bg-red-500 text-white">
          <CardContent className="p-4">
            <p>Total Expenses</p>
            <h2 className="text-2xl font-bold">{expenses.toFixed(2)}</h2>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <h2 className="text-xl font-semibold mb-2">Monthly Overview <span className="text-sm text-muted-foreground">(Last 6 months)</span></h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#22c55e" />
                <Bar dataKey="expense" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-2">
              <div>
                <Label>Description</Label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <Label>Amount</Label>
                <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} />
              </div>
              <div>
                <Label>Date</Label>
                <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div>
                <Label>Type</Label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })} className="w-full border px-3 py-2 rounded">
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            </div>
            <Button onClick={handleSubmit}>Add Transaction</Button>
          </div>

          <h2 className="text-xl font-semibold mt-6">Recent Transactions</h2>
          <ul className="space-y-2 mt-2">
            {transactions.length === 0 ? (
              <p className="text-muted-foreground">No transactions yet. Add your first transaction to get started!</p>
            ) : (
              transactions.map((tx) => (
                <li key={tx._id} className="flex justify-between border p-2 rounded">
                  <div>
                    <p className="font-medium">{tx.description}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(tx.date), "dd MMM yyyy")}</p>
                  </div>
                  <div className="text-right">
                    <p className={tx.type === "income" ? "text-green-600" : "text-red-600"}>{tx.amount}</p>
                    <Button variant="ghost" className="text-xs text-red-500" onClick={() => tx._id && handleDelete(tx._id)}>Delete</Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </TabsContent>
      </Tabs>
    </main>
  );
}
