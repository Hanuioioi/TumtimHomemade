// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Produk {
  id: number;
  nama_produk: string;
  harga: number;
  kategori: string;
  stok: number;
  deskripsi: string;
}

interface CartItem {
  produk: Produk;
  quantity: number;
}

export default function TumTimApp() {
  // State Navigasi Utama
  const [view, setView] = useState<'login' | 'dashboard' | 'katalog' | 'transaksi'>('login');
  
  // State Data Utama
  const [daftarProduk, setDaftarProduk] = useState<Produk[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // State Form Login
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ==========================================
  // STATE KHUSUS CRUD KATALOG
  // ==========================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'update'>('create');
  const [selectedProdukId, setSelectedProdukId] = useState<number | null>(null);
  
  // State Input Form Produk
  const [formNama, setFormNama] = useState('');
  const [formHarga, setFormHarga] = useState(0);
  const [formKategori, setFormKategori] = useState('Roti Manis');
  const [formStok, setFormStok] = useState(0);
  const [formDeskripsi, setFormDeskripsi] = useState('');

  // Fetch Data Produk (Read)
  const muatProduk = () => {
    fetch('/api/produk')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDaftarProduk(data);
      })
      .catch((err) => console.error('Gagal memuat produk:', err));
  };

  useEffect(() => {
    const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('id-ID', dateOptions));
    muatProduk();
  }, []);

  // ==========================================
  // FUNGSI LOGIKA CRUD BACKEND
  // ==========================================
  
  // Buka Modal untuk Tambah (Create)
  const handleOpenCreate = () => {
    setModalMode('create');
    setSelectedProdukId(null);
    setFormNama('');
    setFormHarga(0);
    setFormKategori('Roti Manis');
    setFormStok(0);
    setFormDeskripsi('');
    setIsModalOpen(true);
  };

  // Buka Modal untuk Edit (Update)
  const handleOpenUpdate = (prod: Produk) => {
    setModalMode('update');
    setSelectedProdukId(prod.id);
    setFormNama(prod.nama_produk);
    setFormHarga(prod.harga);
    setFormKategori(prod.kategori);
    setFormStok(prod.stok);
    setFormDeskripsi(prod.deskripsi);
    setIsModalOpen(true);
  };

  // Simpan Data (Create atau Update)
  const handleSaveProduk = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nama_produk: formNama,
      harga: Number(formHarga),
      kategori: formKategori,
      stok: Number(formStok),
      deskripsi: formDeskripsi,
    };

    const url = modalMode === 'create' ? '/api/produk' : `/api/produk?id=${selectedProdukId}`;
    const method = modalMode === 'create' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(modalMode === 'create' ? 'Produk baru berhasil ditambahkan!' : 'Data produk berhasil diperbarui!');
        setIsModalOpen(false);
        muatProduk(); // Refresh data katalog
      } else {
        alert('Gagal menyimpan data produk.');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi API.');
    }
  };

  // Hapus Data (Delete)
  const handleDeleteProduk = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini dari katalog?')) return;

    try {
      const res = await fetch(`/api/produk?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Produk berhasil dihapus!');
        setIsModalOpen(false);
        muatProduk(); // Refresh data katalog
      } else {
        alert('Gagal menghapus produk.');
      }
    } catch (err) {
      alert('Terjadi kesalahan koneksi API.');
    }
  };

  // Logika Kasir / Transaksi
  const addToCart = (produk: Produk) => {
    const existing = cart.find((item) => item.produk.id === produk.id);
    if (existing) {
      setCart(cart.map((item) => item.produk.id === produk.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { produk, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map((item) => {
      if (item.produk.id === id) return { ...item, quantity: item.quantity + delta };
      return item;
    }).filter((item) => item.quantity > 0));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return alert('Keranjang masih kosong!');
    try {
      const res = await fetch('/api/transaksi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama_pelanggan: namaPelanggan, subtotal, pajak, total_bayar: totalBayar }),
      });
      if (res.ok) {
        alert('Transaksi Berhasil Disimpan!');
        setCart([]);
        setNamaPelanggan('');
      }
    } catch (err) {
      alert('Gagal checkout.');
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.produk.harga * item.quantity, 0);
  const pajak = Math.round(subtotal * 0.11);
  const totalBayar = subtotal + pajak;

  // ==========================================
  // VIEW: LOGIN
  // ==========================================
  if (view === 'login') {
    return (
      <div className="bg-[#fff8f2] min-h-screen flex items-center justify-center relative w-full font-sans">
        <main className="w-full max-w-md px-4 relative z-10">
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="bg-white p-6 rounded-full shadow-lg mb-4 border border-[#d3c4b2]">
              <span className="material-symbols-outlined text-5xl text-[#7e5700]">cookie</span>
            </div>
            <h1 className="text-3xl font-bold text-[#201b0f] mb-1">Welcome Back</h1>
            <p className="text-sm text-[#4f4537]">Please enter your details to access your dashboard</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border border-[#ede1ce]">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setView('dashboard'); }}>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#835425] block">Username or Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#817565]">person</span>
                  <input className="w-full pl-12 pr-4 py-3 bg-[#fff8f2] rounded-lg border border-[#d3c4b2] outline-none" type="text" placeholder="manager@tumtim.com" value={identity} onChange={(e) => setIdentity(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-[#835425] block">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#817565]">lock</span>
                  <input className="w-full pl-12 pr-12 py-3 bg-[#fff8f2] rounded-lg border border-[#d3c4b2] outline-none" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#817565]" type="button" onClick={() => setShowPassword(!showPassword)}>
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>
              <button className="w-full py-4 bg-[#d4a24c] text-[#563a00] font-bold rounded-full shadow-md hover:bg-[#7e5700] hover:text-white transition-all flex items-center justify-center gap-2" type="submit">
                <span>Login to Dashboard</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#fff8f2] text-[#201b0f] font-sans min-h-screen flex flex-col">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-[280px] bg-[#e4d9c6] flex flex-col py-6 px-3 overflow-y-auto z-50">
        <div className="mb-10 px-4 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-[#7e5700]">cookie</span>
          </div>
          <h1 className="text-2xl font-bold text-[#201b0f] text-center leading-tight">Tum Tim</h1>
          <p className="text-sm text-[#835425] opacity-70">Cookies & Bakery</p>
        </div>
        <nav className="flex-grow space-y-2">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-[#4f4537] ${view === 'dashboard' ? 'bg-[#d4a24c] text-[#563a00] font-bold' : 'hover:bg-[#ede1ce]'}`}>
            <span className="material-symbols-outlined">dashboard</span><span>Dashboard</span>
          </button>
          <button onClick={() => setView('katalog')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-[#4f4537] ${view === 'katalog' ? 'bg-[#d4a24c] text-[#563a00] font-bold' : 'hover:bg-[#ede1ce]'}`}>
            <span className="material-symbols-outlined">bakery_dining</span><span>Katalog Produk</span>
          </button>
          <button onClick={() => setView('transaksi')} className={`w-full flex items-center gap-4 px-4 py-3 rounded-full text-[#4f4537] ${view === 'transaksi' ? 'bg-[#d4a24c] text-[#563a00] font-bold' : 'hover:bg-[#ede1ce]'}`}>
            <span className="material-symbols-outlined">shopping_cart</span><span>Transaksi Kasir</span>
          </button>
        </nav>
        <div className="mt-auto pt-4 border-t border-[#d3c4b2]/30">
          <button onClick={() => setView('login')} className="w-full flex items-center gap-4 text-[#4f4537] px-4 py-3 hover:bg-[#ffdad6] hover:text-[#93000a] rounded-lg transition-colors">
            <span className="material-symbols-outlined">logout</span><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Container Shell */}
      <main className="ml-[280px] min-h-screen flex flex-col relative">
        {/* Top Navbar */}
        <header className="h-16 flex items-center justify-between px-6 w-full sticky top-0 bg-[#fff8f2]/80 backdrop-blur-md z-40 border-b border-[#d3c4b2]/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4f4537]">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-[#fef2df] border-none rounded-full focus:ring-2 focus:ring-[#7e5700] text-base" placeholder="Cari data..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-[#ffbf87] text-[#7a4b1e] rounded-full">
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span className="text-sm font-semibold">{currentDate}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#ffdeac] flex items-center justify-center border-2 border-[#7e5700]/20">
                <span className="material-symbols-outlined text-[#563a00]">person</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">Admin Kasir</p>
                <p className="text-[10px] text-[#4f4537] uppercase tracking-widest">Shift Pagi</p>
              </div>
            </div>
          </div>
        </header>

        {/* VIEW: DASHBOARD */}
        {view === 'dashboard' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[#7e5700]">Dashboard Overview</h2>
              <p className="text-[#4f4537] text-sm">Welcome back! Here's what's happening at Tum Tim today.</p>
            </div>
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
          </div>
        )}

        {/* VIEW: KATALOG (DENGAN AKSI UPDATE & CREATE) */}
        {view === 'katalog' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#201b0f]">Katalog Produk</h2>
              <p className="text-[#4f4537] text-sm mt-1">Klik pada kartu produk untuk memperbarui data (Update/Delete) atau gunakan tombol di bawah.</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {daftarProduk.map((prod) => (
                <div key={prod.id} onClick={() => handleOpenUpdate(prod)} className="bg-white rounded-xl overflow-hidden border border-[#f4e8d5] shadow-sm p-4 flex flex-col cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all">
                  <div className="aspect-square bg-[#ede1ce] rounded-lg flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-5xl text-[#7e5700]">bakery_dining</span>
                  </div>
                  <h3 className="font-bold text-lg text-[#201b0f] mb-1">{prod.nama_produk}</h3>
                  <p className="text-xs text-[#4f4537] mb-4 flex-1 line-clamp-2">{prod.deskripsi}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-[#7e5700] text-lg">Rp {prod.harga.toLocaleString('id-ID')}</span>
                    <span className="text-xs bg-[#f3e7d4] px-2 py-1 rounded text-[#835425]">Stok: {prod.stok}</span>
                  </div>
                </div>
              ))}
              
              {/* Tombol Tambah Produk Baru */}
              <button onClick={handleOpenCreate} className="border-2 border-dashed border-[#d3c4b2] rounded-xl flex flex-col items-center justify-center p-6 bg-transparent hover:bg-[#ede1ce]/20 group transition-all">
                <span className="material-symbols-outlined text-4xl text-[#d3c4b2] group-hover:text-[#7e5700] mb-2">add_circle</span>
                <span className="text-sm font-semibold text-[#4f4537] group-hover:text-[#7e5700]">Tambah Produk Baru</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW: TRANSAKSI KASIR */}
        {view === 'transaksi' && (
          <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
            <section className="flex-1 p-6 overflow-y-auto">
              <h2 className="text-xl font-bold text-[#7e5700] mb-6">Katalog Pilihan Kasir</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {daftarProduk.map((prod) => (
                  <div key={prod.id} className="group bg-white rounded-xl p-3 border border-[#f8ecd9] flex flex-col cursor-pointer shadow-sm hover:-translate-y-1 transition-all" onClick={() => addToCart(prod)}>
                    <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-[#f8ecd9] flex items-center justify-center">
                      <span className="material-symbols-outlined text-5xl text-[#7e5700]">bakery_dining</span>
                      <button className="absolute bottom-2 right-2 w-10 h-10 bg-[#d4a24c] text-[#563a00] rounded-full flex items-center justify-center"><span className="material-symbols-outlined">add</span></button>
                    </div>
                    <h3 className="font-bold text-[16px] text-[#201b0f] mb-1">{prod.nama_produk}</h3>
                    <p className="text-xs text-[#4f4537] mb-2 line-clamp-2">{prod.deskripsi}</p>
                    <p className="mt-auto font-bold text-[#7e5700] text-lg">Rp {prod.harga.toLocaleString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="w-[400px] bg-white border-l border-[#d3c4b2]/30 flex flex-col shadow-2xl z-10">
              <div className="p-6 border-b border-[#d3c4b2]/30 bg-[#fef2df]">
                <h2 className="text-lg font-bold text-[#201b0f] mb-4">Pesanan Aktif</h2>
                <input className="w-full p-3 bg-white rounded-lg border border-[#d3c4b2]/20 text-sm focus:ring-1 focus:ring-[#7e5700] outline-none" placeholder="Nama Pelanggan" type="text" value={namaPelanggan} onChange={(e) => setNamaPelanggan(e.target.value)}/>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.produk.id} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-[#d3c4b2]/20 shadow-sm">
                    <div className="flex-1">
                      <h4 className="font-bold text-[#201b0f] text-sm">{item.produk.nama_produk}</h4>
                      <p className="text-xs text-[#7e5700]">Rp {item.produk.harga.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f8ecd9] rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item.produk.id, -1)} className="text-[#7e5700] font-bold px-1">-</button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.produk.id, 1)} className="text-[#7e5700] font-bold px-1">+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#fef2df] border-t border-[#d3c4b2]/30 space-y-3">
                <div className="flex justify-between text-sm"><span>Subtotal</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between text-sm"><span>Pajak (11%)</span><span>Rp {pajak.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between items-center pt-2 border-t border-[#d3c4b2]/20 font-bold"><span>Total</span><span className="text-xl text-[#7e5700]">Rp {totalBayar.toLocaleString('id-ID')}</span></div>
                <button className="w-full py-4 bg-[#7e5700] text-white font-bold rounded-xl mt-4" onClick={handleCheckout}>Bayar Sekarang</button>
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* ==========================================
          MODAL FORM POP-UP (UNTUK CREATE & UPDATE)
         ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-fade-in">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl border border-[#ede1ce] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xl font-bold text-[#7e5700]">
                {modalMode === 'create' ? 'Tambah Produk Baru' : 'Perbarui Data Produk'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">✕</button>
            </div>

            <form onSubmit={handleSaveProduk} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-[#4f4537] block mb-1">Nama Produk</label>
                <input className="w-full p-2.5 bg-[#fff8f2] border border-[#d3c4b2] rounded-lg outline-none focus:ring-1 focus:ring-[#7e5700]" type="text" value={formNama} onChange={(e) => setFormNama(e.target.value)} required placeholder="Contoh: Roti Manis Abon"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-[#4f4537] block mb-1">Harga (Rp)</label>
                  <input className="w-full p-2.5 bg-[#fff8f2] border border-[#d3c4b2] rounded-lg outline-none" type="number" value={formHarga} onChange={(e) => setFormHarga(Number(e.target.value))} required/>
                </div>
                <div>
                  <label className="text-sm font-bold text-[#4f4537] block mb-1">Stok Gudang</label>
                  <input className="w-full p-2.5 bg-[#fff8f2] border border-[#d3c4b2] rounded-lg outline-none" type="number" value={formStok} onChange={(e) => setFormStok(Number(e.target.value))} required/>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-[#4f4537] block mb-1">Kategori</label>
                <select className="w-full p-2.5 bg-[#fff8f2] border border-[#d3c4b2] rounded-lg outline-none" value={formKategori} onChange={(e) => setFormKategori(e.target.value)}>
                  <option value="Roti Manis">Roti Manis</option>
                  <option value="Roti Gurih">Roti Gurih</option>
                  <option value="Cookies">Cookies</option>
                  <option value="Paket Hajatan">Paket Hajatan</option>
                </select>
              </div>

             {/* Temukan bagian Deskripsi Produk di dalam Modal Form app/page.tsx */}
<div>
  <label className="text-sm font-bold text-[#4f4537] block mb-1">Deskripsi Produk</label>
  <textarea 
    className="w-full p-2.5 bg-[#fff8f2] border border-[#d3c4b2] rounded-lg outline-none h-24 resize-none" 
    value={formDeskripsi || ''} // <-- PERBAIKAN DI SINI: Tambahkan || ''
    onChange={(e) => setFormDeskripsi(e.target.value)} 
    placeholder="Berikan deskripsi singkat..."
  />
</div>

              <div className="flex gap-3 pt-4 border-t mt-6">
                {modalMode === 'update' && (
                  <button type="button" onClick={() => selectedProdukId && handleDeleteProduk(selectedProdukId)} className="px-4 py-2.5 bg-[#ffdad6] text-[#93000a] font-bold rounded-lg hover:bg-red-200 transition-colors mr-auto">
                    Hapus Produk
                  </button>
                )}
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 border border-[#d3c4b2] text-[#4f4537] font-semibold rounded-lg">
                  Batal
                </button>
                <button type="submit" className="px-6 py-2.5 bg-[#7e5700] text-white font-bold rounded-lg hover:bg-[#604100] transition-colors">
                  {modalMode === 'create' ? 'Tambah' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}