import React, { useState } from 'react';
import { 
  Server, Database, Shield, Cloud, Activity, Code, 
  ChevronRight, ArrowLeft, Mail, Link, ExternalLink,
  Layers, Lock, Cpu, Globe, CheckCircle
} from 'lucide-react';

const projectsData = [
  {
    id: 'hybrid-vm',
    title: 'Implementasi Hybrid Scenario: Integrasi On-Premise & Azure VM',
    category: 'Cloud Infrastructure',
    shortDesc: 'Membangun terowongan aman (VPN Site-to-Site) untuk memperluas kapasitas komputasi on-premise ke Microsoft Azure secara seamless tanpa mengorbankan keamanan.',
    tech: ['Azure VM', 'VPN Gateway', 'VNet', 'NSG'],
    businessValue: 'Merubah model CAPEX ke OPEX, memangkas waktu provisi server dari berminggu-minggu menjadi 15 menit.',
    background: 'Kapasitas pusat data lokal klien (institusi finansial) telah mencapai batas maksimal. Kebutuhan akan skalabilitas mendadak di akhir bulan memerlukan solusi komputasi yang elastis tanpa mengekspos aplikasi internal ke internet publik.',
    architecture: 'Infrastruktur menggunakan Azure Virtual Network (VNet) yang terhubung ke router lokal via Azure VPN Gateway (IPsec/IKEv2). VM di Azure diisolasi menggunakan Network Security Group (NSG) dan hanya dapat diakses melalui alamat IP privat dari intranet perusahaan.',
    implementation: [
      'Desain topologi jaringan dan IP addressing untuk mencegah overlapping.',
      'Deployment Azure VPN Gateway dan konfigurasi Local Network Gateway.',
      'Provisi Azure Virtual Machines (Windows/Linux) pada workload subnet khusus.',
      'Penerapan kebijakan firewall zero-trust menggunakan NSG.',
      'Validasi latensi (< 20ms) dan stabilitas tunnel.'
    ],
    results: [
      'Konektivitas jaringan internal 99.9% uptime dengan throughput tinggi.',
      'Peningkatan kelincahan operasional (Agility) tim developer.',
      'Kepatuhan terhadap regulasi perbankan mengenai isolasi data.'
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
    title: 'Enterprise AI Assistant via Copilot Studio',
    category: 'AI & Automation',
    shortDesc: 'Integrasi agen AI cerdas untuk otomasi dukungan IT internal dan layanan mandiri (self-service) karyawan menggunakan Microsoft Copilot Studio.',
    tech: ['Copilot Studio', 'Power Automate', 'Azure OpenAI'],
    businessValue: 'Mengurangi volume tiket IT Helpdesk Level 1 hingga 60% dan mempercepat resolusi masalah dari hitungan jam menjadi detik.',
    background: 'Tim IT Helpdesk kewalahan menangani pertanyaan berulang (reset password, akses VPN, panduan software) yang menghabiskan waktu engineer tingkat lanjut.',
    architecture: 'Bot AI dibangun di Copilot Studio, diintegrasikan dengan Azure AD untuk autentikasi SSO, dan menggunakan Power Automate untuk mengeksekusi aksi backend (seperti mereset AD password) berdasarkan trigger percakapan.',
    implementation: [
      'Identifikasi top 10 keluhan IT Helpdesk dari data historis.',
      'Desain alur percakapan (dialog tree) dan integrasi Generative AI fallback.',
      'Pembuatan alur Power Automate untuk integrasi sistem on-premise.',
      'Deployment chatbot ke platform Microsoft Teams perusahaan.',
      'Pelatihan dan fine-tuning model bahasa berbasis dokumen SOP perusahaan.'
    ],
    results: [
      'Tingkat penyelesaian masalah mandiri karyawan mencapai 65%.',
      'Peningkatan kepuasan pengguna internal dengan ketersediaan layanan 24/7.',
      'Integrasi aman dan mulus dalam ekosistem Microsoft Teams.'
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-600 selection:text-white">
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
          <div className="flex items-center gap-2">
            <Cloud className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">Data & AI Solution.</span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-blue-600 transition-colors">Tentang</a>
            <a href="#portfolio" className="hover:text-blue-600 transition-colors">Portofolio Proyek</a>
            <a href="#expertise" className="hover:text-blue-600 transition-colors">Keahlian</a>
            <a href="#contact" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Hubungi Saya
            </a>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-slate-900 to-slate-900"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" /> Enterprise-Grade IT Solutions
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Data & AI Solution <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Portfolio</span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Membangun infrastruktur Hybrid Cloud, Solusi Data terukur, dan Automasi modern di ekosistem Microsoft Azure untuk mendorong efisiensi bisnis skala enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/30">
                Lihat Proyek <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-lg text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all">
                Jadwalkan Konsultasi
              </a>
            </div>
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Studi Kasus & Proyek Pilihan</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Portofolio arsitektur dan implementasi infrastruktur IT yang berfokus pada penyelesaian tantangan bisnis nyata di tingkat enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <div className="p-8 flex-grow">
                  <div className="text-xs font-bold tracking-wider text-blue-600 uppercase mb-3">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                    {project.shortDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-blue-50 transition-colors">
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-700">Lihat Detail Proyek</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
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
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-slate-400 mb-8 text-lg">
                Sedang merencanakan migrasi ke cloud, perancangan arsitektur hybrid, atau optimalisasi data center? Mari berdiskusi untuk menemukan solusi teknologi yang selaras dengan tujuan strategis perusahaan Anda.
              </p>
              
              <div className="space-y-4">
                <a href="mailto:contact@example.com" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-lg bg-slate-800 border border-slate-700">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <span className="font-medium">contact@enterprise-cloud.id</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors p-4 rounded-lg bg-slate-800 border border-slate-700">
                  {/* Ikon di bawah ini sudah diperbarui untuk menghindari error module */}
                  <Link className="w-6 h-6 text-blue-400" />
                  <span className="font-medium">linkedin.com/in/cloud-architect</span>
                </a>
              </div>
            </div>
            
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl font-bold mb-6 text-white">Platform & Teknologi Inti</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {['Microsoft Azure', 'SQL Server', 'Tableau', 'Windows Server', 'Linux/Ubuntu', 'Azure AD', 'VPN / IPsec', 'Power Automate', 'Copilot Studio'].map((tech) => (
                  <div key={tech} className="bg-slate-700/50 p-3 rounded-md text-center text-sm font-medium text-slate-300 border border-slate-600/50">
                    {tech}
                  </div>
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
    <div className="min-h-screen bg-slate-50 pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <button 
          onClick={onBack}
          className="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Portofolio
        </button>

        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase mb-6">
            {project.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-800 border border-slate-200">
                <Code className="w-3 h-3 mr-2 text-slate-400" /> {t}
              </span>
            ))}
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
            <h3 className="flex items-center text-blue-800 font-bold mb-2">
              <Activity className="w-5 h-5 mr-2" /> Nilai Bisnis Utama (Value)
            </h3>
            <p className="text-blue-900/80 leading-relaxed">
              {project.businessValue}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Latar Belakang & Masalah</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {project.background}
            </p>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Arsitektur Solusi</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              {project.architecture}
            </p>
            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400">
              <Layers className="w-12 h-12 mb-3 text-slate-300" />
              <p className="text-sm font-medium">Diagram Arsitektur Jaringan (NDA Protected / Placeholder)</p>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Langkah Implementasi</h2>
            <ul className="space-y-4">
              {project.implementation.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center mr-4 border border-slate-200">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 text-lg pt-1">{step}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-slate-900 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Hasil & Pencapaian</h2>
            <div className="grid gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-200 text-lg leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={onBack}
            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all"
          >
            Tutup Studi Kasus
          </button>
        </div>

      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 border-t border-slate-800 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Cloud className="w-6 h-6 text-slate-500" />
          <span className="font-bold text-lg text-slate-300">CloudArchitect.</span>
        </div>
        <p className="text-sm mb-2">
          © {new Date().getFullYear()} Cloud & Infrastructure Engineering Portfolio.
        </p>
        <p className="text-xs text-slate-600">
          Solusi IT Skala Enterprise • Microsoft Azure • Keamanan Terintegrasi
        </p>
      </div>
    </footer>
  );
}