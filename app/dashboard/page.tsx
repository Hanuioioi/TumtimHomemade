// app/dashboard/page.tsx
'use client';

import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="bg-[#fff8f2] text-[#201b0f] min-h-screen">
      {/* Sidebar Nav */}
      <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#e4d9c6] flex flex-col py-6 px-3 z-50">
        <div className="mb-8 px-4">
          <h1 className="text-2xl font-bold text-[#201b0f]">Tum Tim</h1>
          <p className="text-xs text-[#835425]">Cookies & Bakery</p>
        </div>
        <nav className="flex-grow space-y-1">
          <Link href="/dashboard" className="flex items-center gap-4 bg-[#d4a24c] text-[#563a00] rounded-full px-4 py-3 mx-2 font-semibold">
            <span className="material-symbols-outlined">dashboard</span><span>Dashboard</span>
          </Link>
          <Link href="/katalog" className="flex items-center gap-4 text-[#4f4537] hover:bg-[#ede1ce] px-4 py-3 mx-2 rounded-full">
            <span className="material-symbols-outlined">bakery_dining</span><span>Katalog Produk</span>
          </Link>
          <Link href="/transaksi" className="flex items-center gap-4 text-[#4f4537] hover:bg-[#ede1ce] px-4 py-3 mx-2 rounded-full">
            <span className="material-symbols-outlined">shopping_cart</span><span>Transaksi Kasir</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-[280px] p-8 pt-24">
        <h2 className="text-3xl font-bold text-[#7e5700] mb-2">Dashboard Overview</h2>
        <p className="text-[#4f4537] mb-6">Welcome back! Here's what's happening at Tum Tim today.</p>
        
        {/* Bento Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#ede1ce] shadow-sm">
            <p className="text-xs uppercase text-[#4f4537] tracking-wider">Total Sales (Today)</p>
            <h3 className="text-2xl font-bold mt-1">Rp 4.250.000</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#ede1ce] shadow-sm">
            <p className="text-xs uppercase text-[#4f4537] tracking-wider">Orders Processed</p>
            <h3 className="text-2xl font-bold mt-1">142 Orders</h3>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#ede1ce] shadow-sm">
            <p className="text-xs uppercase text-[#4f4537] tracking-wider">Monthly Revenue</p>
            <h3 className="text-2xl font-bold mt-1">Rp 128.5M</h3>
          </div>
        </div>
      </main>
    </div>
  );
}