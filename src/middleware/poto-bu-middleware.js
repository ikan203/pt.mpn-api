import multer from "multer";   // Untuk handle upload file
import fs from "fs";          // Untuk cek & membuat folder
import path from "path";      // Untuk mengelola ekstensi file

// konfigurasi penyimpanan file
const storage = multer.diskStorage({

  // Menentukan folder tujuan penyimpanan
  destination: (req, file, cb) => {
    const dir = 'uploads/poto-bu/';   // Folder tempat file disimpan

    // Jika folder belum ada, maka buat foldernya
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Set folder tujuan ke multer
    cb(null, dir);
  },

  // Menentukan nama file agar tidak bentrok
  filename: (req, file, cb) => {
    // Ambil ekstensi asli file (.jpg, .png, dll)
    const ext = path.extname(file.originalname);

    // Buat nama unik pakai timestamp + random number
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Simpan file dengan nama unik + ekstensi
    cb(null, "poto-BU-" + unique + ext);
  }
});


// filter jenis file 
const fileFilter = (req, file, cb) => {
  const allowed = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp"
  ];

  // Jika bukan gambar, tolak file
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Image type invalid"));
  }

  // Jika valid, izinkan upload
  cb(null, true);
};

// Middleware upload yang dipakai di route
export const PotoBUMiddleware = (fieldName) => //dibuat dinamis
  multer({
    storage,        // pakai konfigurasi folder & nama file
    fileFilter,     // pakai filter tipe file
    limits: {
      fileSize: 5 * 1024 * 1024   // Maksimal ukuran file 5MB
    }
  }).single(fieldName);          // Hanya menerima 1 file
