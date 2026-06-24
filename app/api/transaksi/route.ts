// app/api/transaksi/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { nama_pelanggan, subtotal, pajak, total_bayar } = await request.json();
    
    // Query INSERT ke tabel transaksi MySQL
    const [result] = await pool.query(
      'INSERT INTO transaksi (nama_pelanggan, subtotal, pajak, total_bayar) VALUES (?, ?, ?, ?)',
      [nama_pelanggan || null, subtotal, pajak, total_bayar]
    );

    return NextResponse.json({ 
      message: 'Transaksi sukses disimpan!', 
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan transaksi ke database' }, { status: 500 });
  }
}