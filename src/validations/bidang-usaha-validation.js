import { body } from "express-validator";

export const validationBU = [
  // Mengambil field "nama_BUsaha" dari body request
  body("nama_BUsaha")
    // Mengecek bahwa nama bidang usaha tidak boleh kosong
    .notEmpty().withMessage("Nama bidang usaha wajib diisi")
    // Mengecek bahwa nilai yang dikirim harus berupa string / teks
    .isString().withMessage("Nama bidang usaha harus berupa teks")
    // Mengecek panjang minimal karakter adalah 3
    .isLength({ min: 3 }).withMessage("Nama bidang usaha minimal 3 karakter"),

  // Mengambil field "deskripsi" dari body request
  body("deskripsi")
    // Mengambil field "deskripsi" dari body request
    .optional()
    // Jika dikirim, maka harus bertipe string / teks
    .isString().withMessage("Deskripsi harus berupa teks")
];