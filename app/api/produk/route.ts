// app/api/produk/route.ts
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// 1. READ: Mengambil semua data produk
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM produk ORDER BY id DESC');
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// 2. CREATE: Menambahkan produk baru dari modal form
export async function POST(request: Request) {
  try {
    const { nama_produk, harga, kategori, stok, deskripsi } = await request.json();
    
    const [result] = await pool.query(
      'INSERT INTO produk (nama_produk, harga, kategori, stok, deskripsi) VALUES (?, ?, ?, ?, ?)',
      [nama_produk, harga, kategori, stok, deskripsi || null]
    );

    return NextResponse.json({ message: 'Produk berhasil ditambahkan', id: (result as any).insertId });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Gagal menambahkan produk' }, { status: 500 });
  }
}

// 3. UPDATE: Memperbarui data produk yang dipilih
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID produk tidak ditemukan' }, { status: 400 });
    }

    const { nama_produk, harga, kategori, stok, deskripsi } = await request.json();

    await pool.query(
      'UPDATE produk SET nama_produk = ?, harga = ?, kategori = ?, stok = ?, deskripsi = ? WHERE id = ?',
      [nama_produk, harga, kategori, stok, deskripsi, id]
    );

    return NextResponse.json({ message: 'Produk berhasil diperbarui' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Gagal memperbarui produk' }, { status: 500 });
  }
}

// 4. DELETE: Menghapus produk dari katalog
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID produk tidak ditemukan' }, { status: 400 });
    }

    await pool.query('DELETE FROM produk WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}