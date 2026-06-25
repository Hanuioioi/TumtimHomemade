import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  return (
    <div className="flex bg-background min-h-screen text-on-surface">
      {/* SideNavBar Bawaan */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="ml-[280px] flex-1 min-h-screen">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/80 backdrop-blur-md flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md focus-within:ring-2 focus-within:ring-primary rounded-full overflow-hidden">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full bg-surface-container-low border-none pl-12 pr-4 py-2 text-sm focus:ring-0 focus:outline-none" 
                placeholder="Search data, transactions, or products..." 
                type="text" 
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-outline-variant">
              <div className="text-right">
                <p className="text-sm font-bold text-on-surface">Manager Account</p>
                <p className="text-xs text-on-surface-variant">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden ring-2 ring-primary-container">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqZnEv4l_cyvL_PbJqjXN3eTVN99cr6lPl-3KB7_ZOY21r74_swydU0G9Azj54FINEs3qdWZVFvrrk0ZlDmi9bHfCTGxTzz6E2ymad5-ACbO9_KTLRhzsJUhHr1heVJlY1kEHE8r1ZvQem87QNNxnzEK0Kdok6NucnlARYwQnCGm2PNBv-UPQM4rUpPpZz2xDXZ61YFCwCRMmqiBGPiz1eKpDrFz4lpp4AoeY6SlrffqSRB9o2S17E" 
                  alt="Admin" 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="pt-24 pb-12 px-6 space-y-8">
          {/* Dashboard Header Section */}
          <section className="flex flex-col gap-1">
            <h2 className="font-headline text-3xl font-bold text-primary">Dashboard Overview</h2>
            <p className="text-sm text-on-surface-variant">Welcome back! Here's what's happening at Tum Tim today.</p>
          </section>

          {/* Statistic Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Sales */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(58,42,29,0.06)] border border-surface-container-high transition-transform hover:scale-[1.01]">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-full bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="flex items-center gap-1 text-primary font-bold text-xs px-2 py-1 rounded-full bg-surface-container-low">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  12%
                </span>
              </div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Sales (Today)</p>
              <h3 className="font-headline text-2xl font-bold text-on-surface mt-1">Rp 4.250.000</h3>
            </div>

            {/* Orders Processed */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(58,42,29,0.06)] border border-surface-container-high transition-transform hover:scale-[1.01]">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-full bg-surface-dim text-on-surface-variant">
                  <span className="material-symbols-outlined">receipt_long</span>
                </div>
                <span className="flex items-center gap-1 text-primary font-bold text-xs px-2 py-1 rounded-full bg-surface-container-low">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  8%
                </span>
              </div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Orders Processed</p>
              <h3 className="font-headline text-2xl font-bold text-on-surface mt-1">142 Orders</h3>
            </div>

            {/* Revenue */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(58,42,29,0.06)] border border-surface-container-high transition-transform hover:scale-[1.01]">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-full bg-primary-container text-on-primary-container">
                  <span className="material-symbols-outlined">monitoring</span>
                </div>
                <span className="flex items-center gap-1 text-primary font-bold text-xs px-2 py-1 rounded-full bg-surface-container-low">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  15.4%
                </span>
              </div>
              <p className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Missing Revenue</p>
              <h3 className="font-headline text-2xl font-bold text-on-surface mt-1">Rp 128.5M</h3>
            </div>
          </div>

          {/* Profile Card Section (Sesuai Layout Gambar Pertama) */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_4px_20px_rgba(58,42,29,0.06)] border border-surface-container-high">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Foto Ruko Bluder Shono */}
              <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative group shadow-inner">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/d/1Xl0g5Xp6GZJkY8v6yPZ_X8W2N1k5m-rM" // Menggunakan placeholder atau ganti ke path gambar ruko Anda (contoh: /images/ruko.jpg)
                  alt="Ruko Bluder Shono Tum Tim" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-on-surface px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md">
                    <span className="material-symbols-outlined text-sm">edit</span> Edit Photo
                  </button>
                </div>
              </div>

              {/* Data Detail Toko */}
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface">Tum Tim Cookies & Bakery</h3>
                    <p className="text-sm text-on-surface-variant italic">Artisanal Bakery & Confectionery Specialist</p>
                  </div>
                  <button className="px-6 py-2 bg-primary text-white rounded-full text-xs font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all active:scale-95 shadow-md">
                    Edit Profile
                  </button>
                </div>

                {/* Grid Info Alamat & Jam Buka Sidoarjo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-surface-container-high text-sm">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                      <div>
                        <p className="text-xs font-bold text-on-surface-variant">Location</p>
                        <p className="text-on-surface leading-relaxed font-medium">
                          Park Royal Regency, Jl. Kesatrian No.10 Blok L1, Sono, Sidokerto, Kec. Buduran, Kabupaten Sidoarjo, Jawa Timur 61252
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">call</span>
                      <div>
                        <p className="text-xs font-bold text-on-surface-variant">Contact Phone</p>
                        <p className="text-on-surface font-medium">0811-3000-652 / 0811-3006-399</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5">schedule</span>
                      <div>
                        <p className="text-xs font-bold text-on-surface-variant">Business Hours</p>
                        <p className="text-on-surface font-medium">07:00 AM - 09:00 PM (Daily)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">language</span>
                      <div>
                        <p className="text-xs font-bold text-on-surface-variant">Social & Web</p>
                        <p className="text-on-surface font-medium">@tumtim.cookies | bludershono</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Promotion Highlight / Featured Content Box */}
          <section className="bg-surface-container-highest p-8 rounded-3xl overflow-hidden relative shadow-sm">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <span className="px-4 py-1 bg-primary text-white rounded-full text-xs font-semibold italic">Pilihan Istimewa</span>
                <h2 className="font-headline text-2xl font-bold text-on-surface leading-tight">UNTUK MOMEN HAJATAN YANG LEBIH BERKESAN</h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">Elevate your special events with our premium selection of artisanal breads and cookies. Hand-crafted with passion and the finest ingredients.</p>
                <div className="flex gap-3 pt-2">
                  <button className="bg-primary text-white px-6 py-3 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95">Create Bulk Order</button>
                  <button className="border-2 border-primary text-primary px-6 py-3 rounded-full text-xs font-bold hover:bg-primary/5 transition-all">Download Catalog</button>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-28 h-28 rounded-xl overflow-hidden shadow-md">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8kMnScm28oeO_nnzVqRF6tqDCcyGocUaZD2vDARAcR8FdHNzjhbsxPSH279tRvM08C_E2JHVx8iKxg1A44YpOnUyQBUQtjdid8UO8tBAW30mnOmhU8br6BoFtzxBkdA54xpFGPAWkEx2uRjNWfMCfFH7y3ISqDLr5i5fjw9f5jXKKM53dtkEqA5c-Vlo_rkysOxjFW9hkuJdwVRyGYTL9XQqjKAzuFCBYkK-ft4Nex13NjMxUcGhG" alt="Roti 1" />
                </div>
                <div className="w-28 h-28 rounded-xl overflow-hidden shadow-md">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXLH-lElJEpyKc_lpzgT8ODYnJWRV-QM_IpJcdne52ZC9q8pcNXXpyrAexQHoE2XUjGPC_GL95QGJzWlWeUOcKM7b_5Vx_4dEBpdRKnmwT5IwTiovVYkhlwOeg_aZZONWSUmGIvBNpOpSAZ4TIgU_LM3kIDhHaIv0_mb77FhqQeTGVlalj6Tjv_MtFYgp9RSQdoSmr1hk6N8n5CmKb0Qkr4OlpHYP3l28MeTvmkhkS5eHDsQwEmVge" alt="Roti 2" />
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}