// lib/constants.ts

export type StatusKelayakan = "Sangat Layak" | "Layak" | "Tidak Layak";

export interface CaseData {
  id: number;
  nama: string; // Nama opsional untuk display
  gaji: number;
  pekerjaan: string;
  umur: number;
  tanggungan: number;
  kendaraan: number;
  status: StatusKelayakan;
}

// 1. Data Kasus Referensi (Knowledge Base) - Sesuai permintaan dosen (2 data)
export const KNOWLEDGE_BASE: CaseData[] = [
  {
    id: 1,
    nama: "Budi",
    gaji: 15000000,
    pekerjaan: "PNS",
    umur: 35,
    tanggungan: 1,
    kendaraan: 2,
    status: "Sangat Layak",
  },
  {
    id: 2,
    nama: "Andi",
    gaji: 5000000,
    pekerjaan: "Freelance",
    umur: 25,
    tanggungan: 3,
    kendaraan: 1,
    status: "Tidak Layak",
  },
];

// 2. Pemetaan Pekerjaan ke Nilai Numerik (untuk perhitungan CBR)
// Semakin stabil pekerjaannya, nilainya semakin tinggi (0 - 1)
export const PEKERJAAN_SCORE: Record<string, number> = {
  PNS: 1.0,
  "Pegawai Swasta": 0.8,
  Wiraswasta: 0.7,
  Freelance: 0.4,
  Lainnya: 0.2,
};

// 3. Bobot Tiap Kriteria (Total harus 1 atau 100%)
// Gaji biasanya memiliki pengaruh terbesar dalam kredit
export const WEIGHTS = {
  gaji: 0.4,
  pekerjaan: 0.2,
  tanggungan: 0.2,
  umur: 0.1,
  kendaraan: 0.1,
};

// 4. Nilai Maksimal (untuk Normalisasi 0-1)
// Digunakan agar skala gaji (jutaan) setara dengan jumlah kendaraan (satuan)
export const MAX_VALUES = {
  gaji: 25000000, // Misal batas atas gaji 25jt
  umur: 60,
  tanggungan: 5,
  kendaraan: 4,
};
