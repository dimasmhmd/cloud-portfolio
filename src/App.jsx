import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, Database, Shield, Cloud, Activity, Code, 
  ChevronRight, ArrowLeft, Mail, Link, ExternalLink,
  Layers, Lock, Cpu, Globe, CheckCircle, Image as ImageIcon,
  Maximize, Minimize, Play, ChevronLeft, Film
} from 'lucide-react';

// ==========================================
// DATA PROYEK (DENGAN TEMA ENTERPRISE)
// ==========================================
const projectsData = [
  {
    id: 'hybrid-vm',
    title: 'Implementasi Hybrid Scenario: Integrasi On-Premise & Azure VM',
    category: 'Cloud Infrastructure',
    shortDesc: 'Membangun jalur aman (VPN Site-to-Site) untuk memperluas kapasitas komputasi on-premise ke Microsoft Azure secara seamless tanpa mengorbankan keamanan.',
    tech: ['Azure VM', 'VPN Gateway', 'VNet', 'NSG'],
    businessValue: [
      'Banyak perusahaan terjebak dalam keterbatasan infrastruktur fisik yang kaku. Implementasi Hybrid Cloud hadir sebagai jembatan cerdas untuk modernisasi tanpa harus meninggalkan investasi aset lokal yang sudah ada.',
      'Masalah Utama Sebelum Implementasi:',
      'Keterbatasan Skalabilitas: Sulit dan mahalnya menambah kapasitas server fisik saat beban kerja meningkat mendadak.',
      'Risiko Downtime: Tidak adanya sistem cadangan (redundancy) yang mumpuni di luar lokasi fisik utama.',
      'Biaya Tinggi (CAPEX): Pengeluaran besar di muka untuk pembelian perangkat keras yang seringkali tidak terpakai maksimal.',
      'Manfaat Strategis yang Dihasilkan:',
      'Efisiensi Biaya (CAPEX ke OPEX): Mengurangi kebutuhan pembelian server fisik baru. Anda hanya membayar apa yang Anda gunakan di Azure.',
      'Skalabilitas Fleksibel: Menambah atau mengurangi kapasitas komputasi dalam hitungan menit sesuai permintaan pasar.',
      'High Availability & Reliability: Menjamin aplikasi tetap berjalan meskipun server lokal mengalami gangguan.',
      'Disaster Recovery Readiness: Infrastruktur Azure berfungsi sebagai situs pemulihan bencana (failover) yang tangguh dan otomatis.'
    ],
    background: [
      'Kondisi Existing:',
      'Perusahaan bergantung sepenuhnya pada deretan server fisik (on-premise) di kantor pusat untuk menjalankan aplikasi ERP dan database. Seiring pertumbuhan perusahaan, beban kerja meningkat pesat.',
      'Tantangan:',
      'Maintenance Tinggi: Tim IT menghabiskan waktu hanya untuk memperbaiki hardware lokal.',
      'Resource Terbatas: Ruang di ruang server sudah penuh, pendinginan server tidak lagi optimal.',
      'Rigidity: Membutuhkan waktu 4-8 minggu untuk pengadaan server baru.',
      'Transformasi Digital: Kebutuhan mendesak untuk memiliki akses data dari berbagai wilayah dengan aman.'
    ],
    architecture: 'Infrastruktur menggunakan Azure Virtual Network (VNet) yang terhubung ke router lokal via Azure VPN Gateway (IPsec/IKEv2). VM di Azure diisolasi menggunakan Network Security Group (NSG) dan hanya dapat diakses melalui alamat IP privat dari intranet perusahaan.',
    
    slides: [
      // {
      //   type: 'cover',
      //   title: 'Hybrid Cloud Integration',
      //   subtitle: 'Meruntuhkan Batasan Infrastruktur Tradisional menuju Skalabilitas Tanpa Batas',
      //   bgVideo: 'https://www.w3schools.com/html/mov_bbb.mp4' 
      // },
      // {
      //   type: 'content',
      //   title: 'Tantangan Bisnis Saat Ini',
      //   bullets: [
      //     'Kapasitas Data Center lokal (On-Premise) telah mencapai ambang batas kritis (95%).',
      //     'Proses pengadaan perangkat keras fisik memakan waktu 3-4 minggu.',
      //     'Kebutuhan skalabilitas instan saat terjadi lonjakan transaksi pengguna di akhir bulan.',
      //     'Regulasi ketat perbankan yang mewajibkan isolasi data dari internet publik.'
      //   ]
      // },
      // {
      //   type: 'media',
      //   url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      //   caption: 'Topologi Jaringan Terenkripsi (IPsec VPN Tunneling)',
      //   fit: 'contain'
      // },
      // {
      //   type: 'content',
      //   title: 'Hasil & Dampak Transformasi',
      //   bullets: [
      //     'Agilitas Tinggi: Waktu provisi Virtual Machine baru turun drastis dari 21 hari menjadi hanya 15 menit.',
      //     'Efisiensi Finansial: Berhasil bertransisi dari model investasi CAPEX menjadi langganan OPEX yang terukur.',
      //     'Keamanan Terjamin: 100% lalu lintas data berjalan di jalur terenkripsi (End-to-End) tanpa terekspos keluar.',
      //     'Uptime Tinggi: SLA jaringan internal tercapai di angka 99.9%.'
      //   ]
      // }
    ],
    
    implementation: [
      'Assessment Infrastruktur Existing: Audit kapasitas server, penggunaan bandwidth, dan kompatibilitas aplikasi.',
      'Perencanaan Arsitektur Hybrid: Merancang topologi jaringan (IP Address, Subnet) agar server lokal dan Azure bisa saling "berbicara" dalam satu jaringan privat.',
      'Setup Azure Virtual Network (VNet): Membangun lingkungan jaringan virtual yang aman di Cloud.',
      'Konfigurasi VPN Site-to-Site: Menggunakan Azure VPN Gateway untuk menghubungkan firewall lokal dengan Azure melalui koneksi terenkripsi AES-256 bit.',
      'Provisioning Azure Virtual Machine: Mendeploy server virtual dengan spesifikasi yang dioptimalkan sesuai beban kerja.',
      'Migrasi & Replikasi: Memindahkan sebagian beban kerja (seperti Web Server) ke Azure VM sementara Database tetap di lokal untuk alasan regulasi data.',
      'Integrasi Data & Aplikasi: Sinkronisasi Active Directory lokal dengan Azure agar login karyawan tetap seragam (Single Sign-On).',
      'Testing (Failover & Performance): Simulasi jika koneksi terputus dan pengujian kecepatan akses dari luar kantor.',
      'Monitoring & Optimization: Mengaktifkan Azure Monitor untuk melihat kesehatan sistem secara real-time.'
    ],
    results: [
      'Implementasi ini memberikan dampak nyata yang dapat diukur secara finansial maupun operasional:',
      'Downtime berkurang hingga 99.9%: Dengan fitur Failover dan High Availability di Azure, layanan tetap aktif meskipun ada kendala server fisik (on-premise).',
      'Peningkatan Performa 40%: Aplikasi berjalan lebih cepat karena beban kerja didistribusikan secara cerdas.',
      'Efisiensi Biaya 30%: Mengurangi biaya listrik, pendinginan, dan pemeliharaan hardware fisik tahunan.',
      'Deployment Speed: Menyediakan server baru kini hanya membutuhkan 15 menit, dari yang sebelumnya 4 minggu.'
    ]
  },
  {
    id: 'hybrid-db',
    title: 'Modernisasi Data: Integrasi Azure VM & Azure SQL Managed Instance',
    category: 'Data Platform',
    shortDesc: 'Migrasi dan integrasi platform basis data relasional skala enterprise ke layanan PaaS tersertifikasi Azure dengan sinkronisasi real-time.',
    tech: ['Azure SQL MI', 'Azure Data Studio', 'ExpressRoute'],
    businessValue: 'Mengurangi beban operasional pemeliharaan database (patching, backup) hingga 40%, memungkinkan fokus pada optimasi query bisnis.',
    background: 'Sistem ERP klien berjalan di atas SQL Server on-premise versi lama yang mendekati End-of-Support. Klien membutuhkan modernisasi ke cloud namun mempertahankan kompatibilitas 100% dengan mesin SQL Server untuk menghindari penulisan ulang aplikasi.',
    architecture: 'Menggunakan arsitektur Hub-and-Spoke. Azure SQL Managed Instance (MI) di-deploy ke dalam subnet terisolasi (dedicated subnet). Koneksi dari aplikasi legacy di Azure VM dirutekan secara privat tanpa public endpoint.',
    slides: [], 
    implementation: [
      'Assessment kompatibilitas data menggunakan Data Migration Assistant (DMA).',
      'Deployment Azure SQL Managed Instance pada VNet terisolasi.',
      'Setup konektivitas peering antara VNet aplikasi dan VNet Database.',
      'Migrasi data menggunakan Azure Database Migration Service secara online.',
      'Failover aplikasi ke instance baru dengan downtime kurang dari 10 menit.'
    ],
    results: [
      'Kinerja I/O database meningkat sebesar 35%.',
      'Automasi pencadangan data point-in-time hingga 35 hari.',
      'Penghapusan total biaya overhead OS maintenance.'
    ]
  },
  {
    id: 'ha-sql',
    title: 'High Availability Azure Managed Instance Architecture',
    category: 'Business Continuity',
    shortDesc: 'Perancangan arsitektur pemulihan bencana (DR) dan ketersediaan tinggi lintas zona geografis (Geo-Replication) untuk beban kerja mission-critical.',
    tech: ['SQL MI', 'Geo-Replication', 'Azure Traffic Manager'],
    businessValue: 'Mencapai target RTO (Recovery Time Objective) < 1 jam dan RPO (Recovery Point Objective) < 5 detik untuk sistem transaksi inti.',
    background: 'Sebagai perusahaan ritel nasional, downtime sistem inventori selama 1 jam dapat menyebabkan kerugian ratusan juta rupiah. Sistem lama tidak memiliki failover site yang memadai.',
    architecture: 'Implementasi Azure SQL MI di dua region berbeda (misal: Southeast Asia dan East Asia) menggunakan fitur Auto-failover groups. Azure Traffic Manager digunakan pada layer aplikasi untuk mengarahkan lalu lintas pengguna.',
    slides: [],
    implementation: [
      'Provisi instance primer dan sekunder di region yang berpasangan.',
      'Konfigurasi Auto-failover group dengan kebijakan read-write listener.',
      'Pengalihan koneksi aplikasi untuk memanfaatkan endpoint listener.',
      'Simulasi failover paksa (DR Drill) untuk memvalidasi RTO/RPO.',
      'Monitoring replikasi data via Azure Monitor.'
    ],
    results: [
      'Uptime SLA terjamin pada tingkat 99.99%.',
      'Read scale-out: Beban pelaporan analitik dialihkan ke node sekunder, meringankan node primer.',
      'Sistem berhasil melewati audit kelayakan Disaster Recovery ISO 27001.'
    ]
  },
  {
    id: 'copilot-studio',
    title: 'Enterprise AI Assistant',
    category: 'AI & Automation',
    shortDesc: 'Integrasi agen AI cerdas untuk otomasi dukungan IT dan layanan mandiri (self-service).',
    tech: ['Copilot Studio', 'Power Automate', 'Azure OpenAI'],
    businessValue: [
      'Banyak organisasi menghadapi "tembok" dalam skala pelayanan: semakin besar bisnis, semakin tinggi beban tim support. AI Assistant hadir bukan untuk mengganti manusia, melainkan untuk memperkuat kapasitas mereka.',
      'Masalah Utama Sebelum Implementasi:',
      'Respon Terhambat: Customer / user harus menunggu jam kerja atau antrean panjang untuk pertanyaan sederhana.',
      'Kelelahan Operasional: Tim support menghabiskan 70% waktu mereka menjawab pertanyaan repetitif (FAQ).',
      'Knowledge Silos: Informasi penting tersebar di ribuan dokumen PDF dan database yang sulit diakses secara cepat.',
      'Inkonsistensi: Jawaban yang diberikan antar agen seringkali berbeda, meningkatkan risiko human error.',
      'Manfaat Strategis yang Dihasilkan:',
      'Otomasi Layanan 24/7: Layanan tersedia setiap saat tanpa biaya lembur / penambahan staf.',
      'Respon Instan & Konsisten: Jawaban diberikan dalam hitungan detik dengan akurasi data yang terjamin.',
      'Pengurangan Beban Operasional: Menurunkan volume tiket support secara signifikan sehingga tim support dapat fokus pada masalah kompleks.',
      'Knowledge Terpusat: Mengubah ribuan dokumen menjadi "otak digital" yang dapat ditanya kapan saja.',
      'Peningkatan Kepuasan (CSAT): Memberikan pengalaman customer / user yang modern, cepat, dan solutif.'
    ],
    background: [
      'Tim Customer Service menangani pertanyaan dari customer / user secara manual. Dokumentasi disimpan dalam folder shared drive yang membuat staf kesulitan mencari informasi terbaru saat berhadapan dengan customer / user.',
      'Tantangan:',
      'Tidak Scalable: Penambahan jumlah customer / user mengharuskan penambahan jumlah staf secara linear.',
      'Response Time Lama: Rata-rata waktu tunggu customer / user mencapai 15-30 menit.',
      'Ketergantungan Manusia: Kehilangan satu karyawan senior berarti kehilangan banyak "pengetahuan" tentang produk.'
    ],
    architecture: 'Bot AI dibangun, diintegrasikan dengan Azure dan menggunakan Power Automate untuk memberikan informasi berdasarkan trigger percapapan.',
    
    slides: [
      { type: 'media', url: '/chatbot/slide1.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide2.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide3.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide4.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide5.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide6.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide7.png', fit: 'contain' },
      { type: 'media', url: '/chatbot/slide8.png', fit: 'contain' },
      { 
        type: 'media', 
        url: '/chatbot/demo.mp4', // PERBAIKAN: Gunakan kunci 'url', bukan 'bgVideo' untuk tipe media
        caption: 'Video Demonstrasi Fitur AI Chatbot' 
      },
      { type: 'media', url: '/chatbot/slide9.png', fit: 'contain' },
    ],

    implementation: [
      'Requirement Gathering: Mengidentifikasi pertanyaan paling sering muncul dan menentukan sumber data utama.',
      'Data Preprocessing & Embedding: Membersihkan data dari dokumen (PDF/Docx) dan mengubahnya menjadi format vektor agar "dimengerti" oleh mesin.',
      'Setup AI Model (LLM): Konfigurasi model bahasa tingkat lanjut (seperti GPT-4 melalui Azure OpenAI) sebagai otak pemroses bahasa.',
      'Integrasi Vector Database: Menggunakan database khusus untuk menyimpan pengetahuan perusahaan agar AI tidak berhalusinasi dan tetap merujuk pada data asli (RAG).',
      'Development Chatbot Interface: Membangun antarmuka yang ramah pengguna (Web Widget).',
      'Integrasi Sistem: Menghubungkan chatbot ke infrastruktur cloud perusahaan.',
      'Testing & Guardrails: Menguji akurasi jawaban dan memasang batasan agar AI tidak menjawab hal-hal di luar topik perusahaan.',
      'Deployment & Monitoring: Peluncuran bertahap dan evaluasi performa secara real-time.'
    ],
    results: [
      'Tingkat penyelesaian masalah mandiri mencapai 60%.',
      'Peningkatan kepuasan customer / user dengan ketersediaan layanan 24/7.',
      'Integrasi aman dan mulus dalam ekosistem perusahaan.'
    ]
  },
  {
    id: 'tableau-server',
    title: 'Enterprise Tableau Server Cloud Deployment',
    category: 'Data Analytics',
    shortDesc: 'Desain infrastruktur dan instalasi Tableau Server pada Microsoft Azure untuk mendukung visualisasi data bagi 500+ pengguna eksekutif.',
    tech: ['Tableau Server', 'Azure VM', 'Azure AD', 'Load Balancer'],
    businessValue: 'Menyediakan platform analitik terpusat yang aman, mendorong budaya pengambilan keputusan berbasis data di seluruh departemen C-Level.',
    background: 'Klien membutuhkan platform Business Intelligence (BI) mandiri yang mematuhi standar privasi data yang ketat, yang tidak dapat dipenuhi oleh solusi SaaS publik.',
    architecture: 'Arsitektur cluster multi-node Tableau Server di atas Azure Virtual Machine berskala besar. Dilindungi oleh Azure Application Gateway (WAF) dan terintegrasi dengan Azure Active Directory untuk SSO SAML.',
    slides: [],
    implementation: [
      'Sizing spesifikasi Azure VM untuk node Primer, Pekerja (Worker), dan Backgrounder.',
      'Instalasi dan inisialisasi Tableau Server dalam mode cluster.',
      'Konfigurasi Load Balancer untuk distribusi lalu lintas web klien.',
      'Setup integrasi Identity Provider (IdP) dengan Azure AD.',
      'Tuning performa ekstrak data (Hyper) yang bersumber dari Azure SQL.'
    ],
    results: [
      'Waktu muat dashboard analitik kompleks stabil di bawah 3 detik.',
      'Keamanan data granular berbasis peran (Row-Level Security) berhasil diimplementasikan.',
      'Infrastruktur siap untuk scale-out secara horizontal jika jumlah pengguna bertambah.'
    ]
  }
];

// ==========================================
// KOMPONEN: PRESENTATION SLIDER
// ==========================================
function PresentationSlider({ slides }) {
  const [isIdle, setIsIdle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const containerRef = useRef(null);
  
  const nextSlide = () => setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  // Fungsi pembantu untuk cek apakah URL adalah video
  const isVideo = (url) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg)$/i) || url.includes('w3schools.com/html/');
  };

  // Keyboard navigation & Escape key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape' && isFullscreen && !isNativeFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, isFullscreen, isNativeFullscreen]);

  // Auto-hide navigation
  useEffect(() => {
    let timeout;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsIdle(true), 3000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetIdle);
      container.addEventListener('touchstart', resetIdle);
      container.addEventListener('keydown', resetIdle);
      resetIdle();
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', resetIdle);
        container.removeEventListener('touchstart', resetIdle);
        container.removeEventListener('keydown', resetIdle);
      }
      clearTimeout(timeout);
    };
  }, []);

  // Scroll lock saat fullscreen palsu (CSS fallback)
  useEffect(() => {
    if (isFullscreen && !isNativeFullscreen) {
      document.body.style.overflow = 'hidden'; 
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.documentElement.style.overflow = 'unset';
    };
  }, [isFullscreen, isNativeFullscreen]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isActive = !!document.fullscreenElement;
      setIsNativeFullscreen(isActive);
      setIsFullscreen(isActive);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else {
          setIsFullscreen(true);
        }
      } catch (err) {
        console.warn("Native Fullscreen diblokir. Mengaktifkan CSS Fallback.");
        setIsFullscreen(true); 
      }
    } else {
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        } else {
          setIsFullscreen(false);
        }
      } catch (err) {
        setIsFullscreen(false);
      }
    }
  };

  const customStyles = `
    .idle-hide { opacity: 0 !important; transition: opacity 0.5s ease-in-out !important; pointer-events: none; }
    .idle-show { opacity: 1 !important; transition: opacity 0.3s ease-in-out !important; }
    
    .custom-slide-active .bullet-anim {
      opacity: 0;
      transform: translateX(-30px);
      animation: slideRightFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .custom-slide-active .bullet-anim:nth-child(1) { animation-delay: 0.2s; }
    .custom-slide-active .bullet-anim:nth-child(2) { animation-delay: 0.4s; }
    .custom-slide-active .bullet-anim:nth-child(3) { animation-delay: 0.6s; }
    .custom-slide-active .bullet-anim:nth-child(4) { animation-delay: 0.8s; }
    .custom-slide-active .bullet-anim:nth-child(5) { animation-delay: 1.0s; }

    @keyframes slideRightFade {
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes gradientPan {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .tech-gradient {
      background: linear-gradient(-45deg, #020617, #1e3a8a, #0f172a, #0284c7);
      background-size: 300% 300%;
      animation: gradientPan 12s ease infinite;
    }

    .slide-scroll::-webkit-scrollbar { width: 6px; }
    .slide-scroll::-webkit-scrollbar-track { background: transparent; }
    .slide-scroll::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
  `;

  if (!slides || slides.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      id="presentation-container"
      className={`relative overflow-hidden bg-slate-950 transition-all duration-300 ease-in-out ${
        isNativeFullscreen
          ? 'w-full h-full rounded-none border-none' 
          : isFullscreen
            ? '!fixed !inset-0 !z-[99999] !w-screen !h-[100dvh] !m-0 !p-0 !rounded-none !border-none' 
            : 'aspect-[16/10] md:aspect-video w-full mt-8 rounded-2xl border border-slate-800 shadow-2xl group'
      }`}
    >
      <style>{customStyles}</style>

      {/* Tombol Fullscreen */}
      <button 
        onClick={toggleFullscreen}
        className={`absolute top-4 right-4 z-[100000] p-2.5 bg-slate-900/60 border border-slate-700 hover:bg-blue-600 hover:border-blue-400 rounded-lg text-white backdrop-blur-md transition-all shadow-lg ${isIdle ? 'idle-hide' : 'idle-show'}`}
        title={isFullscreen ? "Keluar Fullscreen (Esc)" : "Mulai Fullscreen"}
      >
        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
      </button>

      {/* Kontainer Utama Slide */}
      <div className="w-full h-full relative" onTouchStart={(e) => {
        const touch = e.touches[0];
        containerRef.current.startX = touch.clientX;
      }} onTouchEnd={(e) => {
        const touch = e.changedTouches[0];
        const diffX = containerRef.current.startX - touch.clientX;
        if (diffX > 50) nextSlide();
        if (diffX < -50) prevSlide();
      }}>
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div 
              key={index} 
              className={`absolute inset-0 w-full h-full bg-slate-950 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-10 custom-slide-active' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <div className="w-full h-full flex items-center justify-center relative">
                
                {/* === TIPE 1: COVER SLIDE === */}
                {slide.type === 'cover' && (
                  <div className="w-full h-full relative flex flex-col items-center justify-center text-center p-8 tech-gradient overflow-hidden">
                    {slide.bgVideo && (
                      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-lighten">
                        <source src={slide.bgVideo} type="video/mp4" />
                      </video>
                    )}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    <div className="relative z-10 max-w-5xl px-4">
                      <div className={`transition-all duration-1000 transform ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs md:text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                          <Play className="w-4 h-4 fill-blue-300" /> Executive Pitch Deck
                        </div>
                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
                          {slide.title}
                        </h2>
                        <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full mb-8 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                        <p className="text-base md:text-2xl text-blue-100 font-light drop-shadow-md max-w-3xl mx-auto leading-relaxed">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* === TIPE 2: CONTENT === */}
                {slide.type === 'content' && (
                  <div className="w-full h-full flex flex-col justify-center p-8 md:p-20 lg:p-24 relative slide-scroll">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10 max-w-5xl w-full mx-auto text-left">
                      <h2 className={`text-2xl md:text-5xl font-bold text-white mb-10 border-l-4 border-blue-500 pl-6 transition-all duration-700 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        {slide.title}
                      </h2>
                      <ul className="space-y-5 md:space-y-8">
                        {slide.bullets?.map((bullet, idx) => (
                          <li key={idx} className="bullet-anim flex items-start text-base md:text-2xl text-slate-300 font-light bg-slate-900/40 p-4 md:p-6 rounded-xl border border-slate-800/50 backdrop-blur-sm shadow-xl">
                            <span className="mr-4 md:mr-5 text-blue-500 mt-1 md:mt-0 text-xl md:text-2xl">▹</span>
                            <span className="leading-relaxed">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* === TIPE 3: MEDIA (DENGAN PERBAIKAN VIDEO) === */}
                {slide.type === 'media' && (
                  <div className="w-full h-full bg-slate-950 relative flex flex-col items-center justify-center overflow-hidden">
                    {isVideo(slide.url) ? (
                      <video 
                        key={slide.url} // Re-render saat slide aktif atau URL berubah
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className={`w-full h-full transition-all duration-1000 ${slide.fit === 'cover' ? 'object-cover' : 'object-contain'} ${isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                      >
                        <source src={slide.url} type="video/mp4" />
                        Browser tidak mendukung video.
                      </video>
                    ) : (
                      <img 
                        src={slide.url} 
                        alt={slide.caption}
                        className={`w-full h-full transition-all duration-1000 ${slide.fit === 'cover' ? 'object-cover' : 'object-contain'} ${isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    )}
                    
                    <div className="absolute inset-0 hidden flex-col items-center justify-center text-slate-500 bg-slate-900 border-2 border-dashed border-slate-700">
                       {isVideo(slide.url) ? <Film className="w-16 h-16 mb-4 opacity-50" /> : <ImageIcon className="w-16 h-16 mb-4 opacity-50" />}
                       <span className="text-lg font-medium">Media Tidak Ditemukan</span>
                       <span className="text-sm font-mono text-slate-600 mt-2 text-center px-4">{slide.url}</span>
                    </div>
                    
                    {slide.caption && (
                      <div className={`absolute bottom-6 md:bottom-12 px-6 py-2.5 md:px-8 md:py-3.5 bg-slate-900/80 backdrop-blur-md border border-slate-700/80 rounded-full transition-all duration-700 delay-500 shadow-xl z-20 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <p className="text-slate-200 font-medium tracking-wide text-xs md:text-base">{slide.caption}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigasi Panah */}
      <button onClick={prevSlide} className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/60 border border-slate-700 text-white backdrop-blur-md transition-all shadow-lg ${isIdle ? 'idle-hide md:opacity-0' : 'idle-show md:opacity-100'}`}>
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>
      <button onClick={nextSlide} className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-slate-900/60 border border-slate-700 text-white backdrop-blur-md transition-all shadow-lg ${isIdle ? 'idle-hide md:opacity-0' : 'idle-show md:opacity-100'}`}>
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Pagination Dots */}
      <div className={`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-slate-900/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-700/50 ${isIdle ? 'idle-hide' : 'idle-show'}`}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-4 h-4 bg-blue-500 scale-110 shadow-lg' : 'w-2.5 h-2.5 bg-slate-400 hover:bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN UTAMA (LAYOUT & FOOTER)
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const navigateToProject = (project) => {
    setSelectedProject(project);
    setCurrentView('detail');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    setSelectedProject(null);
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {currentView === 'home' ? (
        <HomeView onSelectProject={navigateToProject} />
      ) : (
        <ProjectDetailView project={selectedProject} onBack={navigateToHome} />
      )}
      <Footer />
    </div>
  );
}

function HomeView({ onSelectProject }) {
  return (
    <main>
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight">
            {/* <Cloud className="w-8 h-8" /> Data & AI Solution. */}
            <img src="/Intikom-Logo.png" alt="Logo" width="150" />
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
            <a href="#portfolio" className="hover:text-blue-600 transition-colors">Portofolio Proyek</a>
            <a href="#expertise" className="hover:text-blue-600 transition-colors">Keahlian</a>
            <a href="#contact" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-slate-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-sm font-medium mb-6">
            <Shield className="w-4 h-4" /> Enterprise-Grade IT Solutions
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Data & AI Solution <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Portfolio</span>
          </h1>
          <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Membangun infrastruktur Hybrid Cloud, Solusi Data terukur, dan Automasi modern di ekosistem Microsoft Azure untuk mendorong efisiensi bisnis skala enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30">Lihat Proyek <ChevronRight className="ml-2 w-5 h-5" /></a>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Professional IT & Cloud Consultant</h2>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Dengan pengalaman mendalam dalam merancang dan mengimplementasikan arsitektur IT modern, saya membantu perusahaan menjembatani kesenjangan antara infrastruktur lokal (on-premise) dan skalabilitas cloud awan.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Fokus utama saya adalah memastikan keamanan jaringan, ketersediaan data tinggi (High Availability), dan efisiensi operasional sistem mission-critical bisnis Anda.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <Cloud className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900">Microsoft Azure</h3>
                  <p className="text-sm text-slate-500">IaaS & PaaS Architecture</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <Layers className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900">Hybrid Infrastructure</h3>
                  <p className="text-sm text-slate-500">VPN, ExpressRoute, VNet</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <Database className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900">Data Platform & BI</h3>
                  <p className="text-sm text-slate-500">SQL MI, Tableau Server</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <Cpu className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900">Automation & AI</h3>
                  <p className="text-sm text-slate-500">Copilot Studio, DevOps</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-slate-200 to-slate-100 p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
                 <div className="absolute inset-0 bg-blue-900/5 backdrop-blur-3xl"></div>
                 <div className="relative z-10 grid grid-cols-2 gap-6 w-full h-full">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col justify-center items-center p-6 transform translate-y-4">
                       <Server className="w-12 h-12 text-slate-300 mb-2" />
                       <span className="text-xs font-bold text-slate-400">ON-PREMISE</span>
                    </div>
                    <div className="bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 flex flex-col justify-center items-center p-6 transform -translate-y-4">
                       <Cloud className="w-12 h-12 text-white mb-2" />
                       <span className="text-xs font-bold text-blue-200">AZURE CLOUD</span>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                       <div className="h-16 w-1 bg-gradient-to-b from-slate-300 to-blue-500 mx-auto rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 text-white bg-blue-500 rounded-full p-1" />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Studi Kasus & Proyek Pilihan</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Portofolio arsitektur dan implementasi infrastruktur IT tingkat enterprise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project) => (
              <div key={project.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col" onClick={() => onSelectProject(project)}>
                <div className="p-8 flex-grow">
                  <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-3">{project.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">{project.shortDesc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-slate-600 group-hover:text-blue-700 transition-colors">
                  Lihat Detail <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Komponen Arsitektur Utama</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Keahlian spesifik dalam merancang dan men-deploy sumber daya berbasis cloud dengan standar keamanan industri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Virtual Network & VPN</h4>
              <p className="text-sm text-slate-500 text-center">Isolasi jaringan privat di cloud dan terowongan enkripsi aman untuk komunikasi hybrid.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                <Server className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Azure Compute</h4>
              <p className="text-sm text-slate-500 text-center">Desain dan provisi Virtual Machines berskala elastis untuk berbagai beban kerja operasional.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Security & Identity</h4>
              <p className="text-sm text-slate-500 text-center">Penerapan Network Security Group (NSG) dan integrasi SSO Azure Active Directory.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4 border border-blue-100">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">PaaS Database</h4>
              <p className="text-sm text-slate-500 text-center">Manajemen Azure SQL Managed Instance untuk efisiensi dan ketersediaan tinggi.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="text-left">
              <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-slate-400 mb-8 text-lg">Mari berdiskusi untuk menemukan solusi teknologi yang selaras dengan tujuan strategis perusahaan Anda.</p>
              <div className="space-y-4">
                <a href="mailto:clouddatasolutions@intikom.co.id" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span className="font-medium">clouddatasolutions@intikom.co.id</span>
                </a>
                <a href="https://intikom.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <Link className="w-6 h-6 text-blue-400" />
                  <span className="font-medium">https://intikom.com/</span>
                </a>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-6 text-white text-left">Platform & Teknologi Inti</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Microsoft Azure', 'SQL Server', 'Tableau', 'Windows Server', 'Linux/Ubuntu', 'Azure AD', 'VPN / IPsec', 'Power Automate', 'Copilot Studio'].map((tech) => (
                  <div key={tech} className="bg-slate-700/50 p-3 rounded-md text-center text-sm font-medium text-slate-300 border border-slate-600/50">{tech}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProjectDetailView({ project, onBack }) {
  if (!project) return null;
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <button onClick={onBack} className="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Portofolio
        </button>
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-8 text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase mb-6">{project.category}</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{project.title}</h1>
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
            <h3 className="flex items-center text-blue-800 font-bold mb-2"><Activity className="w-5 h-5 mr-2" /> Nilai Bisnis Utama</h3>
            <div className="text-blue-900/80 leading-relaxed">
              {Array.isArray(project.businessValue) ? (
                project.businessValue.map((item, index) => {
                  // 1. Jika kalimat berakhiran titik dua (:) -> Jadikan Judul Section
                  if (item.trim().endsWith(':')) {
                    return <h4 key={index} className="font-bold text-blue-900 mt-5 mb-2">{item}</h4>;
                  }
                  // 2. Jika kalimat mengandung titik dua (:) di tengah -> Jadikan List Poin
                  if (item.includes(':') && index > 1) {
                    const [boldPart, ...restPart] = item.split(':');
                    return (
                      <div key={index} className="flex items-start mb-2 ml-2 md:ml-4">
                        <span className="mr-2.5 text-blue-500 font-bold mt-0.5">✓</span>
                        <p><strong className="text-blue-900">{boldPart}:</strong>{restPart.join(':')}</p>
                      </div>
                    );
                  }
                  // 3. Kalimat biasa -> Jadikan Paragraf
                  return <p key={index} className="mb-3">{item}</p>;
                })
              ) : (
                <p>{project.businessValue}</p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-8">
          {project.slides && project.slides.length > 0 && (
            <section className="bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 border-b pb-4 text-left">Pitch Deck</h2>
              <p className="text-slate-500 text-sm mb-6 text-left">Gunakan swipe atau panah keyboard untuk navigasi.</p>
              <PresentationSlider slides={project.slides} />
            </section>
          )}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-4">Latar Belakang</h2>
            {/* <p className="text-slate-600 leading-relaxed text-lg">{project.background}</p> */}
            <div className="text-slate-600 leading-relaxed text-lg">
              {Array.isArray(project.background) ? (
                project.background.map((item, index) => {
                  // 1. Jika kalimat berakhiran titik dua (:) -> Jadikan Judul Section
                  if (item.trim().endsWith(':')) {
                    return <h4 key={index} className="font-bold text-slate-900 mt-5 mb-2">{item}</h4>;
                  }
                  // 2. Jika kalimat mengandung titik dua (:) di tengah -> Jadikan List Poin
                  if (item.includes(':') && index > 1) {
                    const [boldPart, ...restPart] = item.split(':');
                    return (
                      <div key={index} className="flex items-center mb-2 ml-2 md:ml-4">
                        <span className="mr-2.5 text-slate-500 font-bold mt-0.5">✓</span>
                        <p><strong className="text-slate-900">{boldPart}:</strong>{restPart.join(':')}</p>
                      </div>
                    );
                  }
                  // 3. Kalimat biasa -> Jadikan Paragraf
                  return <p key={index} className="mb-3">{item}</p>;
                })
              ) : (
                <p>{project.background}</p>
              )}
            </div>
          </section>
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Langkah Implementasi</h2>
            <ul className="space-y-4">
              {project.implementation.map((step, idx) => {
                // Logika pemisahan teks berdasarkan titik dua (:)
                const hasColon = step.includes(':');
                let boldPart = '';
                let restPart = '';

                if (hasColon) {
                  const parts = step.split(':');
                  boldPart = parts[0];
                  restPart = parts.slice(1).join(':'); // Gabungkan kembali jika ada titik dua lain di sisa kalimat
                }

                return (
                  <li key={idx} className="flex items-center">
                    {/* Lingkaran Angka */}
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center mr-4 mt-0.5 border border-blue-200">
                      {idx + 1}
                    </div>
                    {/* Teks Implementasi */}
                    <div className="text-slate-700 text-lg leading-relaxed">
                      {hasColon ? (
                        <p>
                          <strong className="text-slate-900">{boldPart}:</strong>
                          {restPart}
                        </p>
                      ) : (
                        <p>{step}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="bg-slate-900 rounded-2xl p-8 shadow-lg text-left">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Hasil & Pencapaian</h2>
            {/* <div className="grid gap-4">
              {project.results.map((res, idx) => (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 mt-0.5" />
                  <p className="text-slate-200 text-lg leading-relaxed">{res}</p>
                </div>
              ))}
            </div> */}
            <div className="grid gap-4">
              {project.results.map((res, idx) => {
              // Logika Cerdas: Cek apakah ini kalimat pengantar atau poin hasil
              const isHeader = res.trim().endsWith(':');
              const hasColon = res.includes(':');

              if (isHeader) {
                // Jika kalimat berakhiran titik dua (Teks Pengantar) -> Tanpa Centang
                return (
                <p key={idx} className="text-slate-300 text-lg leading-relaxed mb-2">
                  {res}
                </p>
                );
              }

              if (hasColon) {
                // Jika ada titik dua di tengah kalimat -> Beri Centang + Bold
                const [boldPart, ...restPart] = res.split(':');
                return (
                <div key={idx} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-200 text-lg leading-relaxed">
                  <strong className="text-white font-semibold">{boldPart}:</strong>{restPart.join(':')}
                  </p>
                </div>
                );
              }

              // Default: Kalimat biasa -> Beri Centang tanpa Bold
              return (
                <div key={idx} className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-slate-200 text-lg leading-relaxed">{res}</p>
                </div>
              );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-2 mb-4 font-bold text-lg text-slate-300">
          <Cloud className="w-6 h-6 text-blue-500" /> Data & AI Solution.
        </div>
        <p className="text-sm mb-2">© {new Date().getFullYear()} Data & AI Solution Portfolio.</p>
        <p className="text-xs text-slate-600">Solusi IT Skala Enterprise • powered by PT Intikom Berlian Mustika • Microsoft Azure</p>
      </div>
    </footer>
  );
}