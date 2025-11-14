Projek ini bernama Tugas Tracker, projek ini adalah projek 
yang berguna untuk memanajemen tugas kuliah agar semua 
tugasnya dapat diselesaikan dengan tepat waktu.

Tugas tracker mempunyai fitur CRUD:
C (Create): menambahkan nama tugas, deskripsi dan tenggatnya
R (Read): membaca semua tugas yang terdaftar di suatu mata kuliah
U (Update):  memperbarui detail seperti nama tugas, deskripsi, hingga tenggatnya
D (Delete): menghapus mata kuliah yang telah selesai atau yang sudah tidak diperlukan



myproject-frontend/
│
├── public/            # Berisi assets statis (ikon, gambar)
│
├── src/
│   ├── assets/        # Gambar, ikon, file statis yang digunakan di komponen
│   ├── components/    # Reusable UI components
│   ├── pages/         # Halaman utama (Home, Login, Dashboard, dll)
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React context (state global)
│   ├── utils/         # Helper functions seperti formatter, validator
│   ├── App.jsx        # Root component
│   └── main.jsx       # Entry point untuk aplikasi
│
├── index.html         # File HTML utama
├── package.json       # Konfigurasi dependencies
└── vite.config.js     # Konfigurasi Vite
