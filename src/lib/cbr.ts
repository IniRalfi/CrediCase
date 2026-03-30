// lib/cbr.ts

import { KNOWLEDGE_BASE, PEKERJAAN_SCORE, WEIGHTS, MAX_VALUES, CaseData } from "./constants";

// Fungsi untuk menormalkan nilai menjadi skala 0 sampai 1
const normalize = (value: number, max: number) => {
  return Math.min(value / max, 1);
};

export interface CbrResult {
  kasusReferensi: CaseData;
  distance: number;
  similarity: number;
  details: {
    dGaji: number;
    dPekerjaan: number;
    dUmur: number;
    dTanggungan: number;
    dKendaraan: number;
  };
}

export const calculateCBR = (input: {
  gaji: number;
  pekerjaan: string;
  umur: number;
  tanggungan: number;
  kendaraan: number;
}): CbrResult[] => {
  // 1. Ubah input pekerjaan menjadi angka berdasarkan mapping di konstanta
  const pekerjaanInputVal = PEKERJAAN_SCORE[input.pekerjaan] || 0.1;

  // 2. Normalisasi input user (skala 0 - 1)
  const nGajiInput = normalize(input.gaji, MAX_VALUES.gaji);
  const nUmurInput = normalize(input.umur, MAX_VALUES.umur);
  const nTanggunganInput = normalize(input.tanggungan, MAX_VALUES.tanggungan);
  const nKendaraanInput = normalize(input.kendaraan, MAX_VALUES.kendaraan);

  // 3. Bandingkan dengan setiap kasus di Knowledge Base
  const results = KNOWLEDGE_BASE.map((kasus) => {
    // Normalisasi data kasus referensi
    const nGajiKasus = normalize(kasus.gaji, MAX_VALUES.gaji);
    const nPekerjaanKasus = PEKERJAAN_SCORE[kasus.pekerjaan] || 0.1;
    const nUmurKasus = normalize(kasus.umur, MAX_VALUES.umur);
    const nTanggunganKasus = normalize(kasus.tanggungan, MAX_VALUES.tanggungan);
    const nKendaraanKasus = normalize(kasus.kendaraan, MAX_VALUES.kendaraan);

    // 4. Hitung Jarak Berbobot (Weighted Euclidean Distance)
    // Rumus: Bobot * (Nilai_Input - Nilai_Kasus)^2
    const dGaji = WEIGHTS.gaji * Math.pow(nGajiInput - nGajiKasus, 2);
    const dPekerjaan = WEIGHTS.pekerjaan * Math.pow(pekerjaanInputVal - nPekerjaanKasus, 2);
    const dUmur = WEIGHTS.umur * Math.pow(nUmurInput - nUmurKasus, 2);
    const dTanggungan = WEIGHTS.tanggungan * Math.pow(nTanggunganInput - nTanggunganKasus, 2);
    const dKendaraan = WEIGHTS.kendaraan * Math.pow(nKendaraanInput - nKendaraanKasus, 2);

    // Total Jarak (Distance)
    const distance = Math.sqrt(dGaji + dPekerjaan + dUmur + dTanggungan + dKendaraan);

    // 5. Konversi Jarak menjadi Persentase Kemiripan (Similarity)
    // Semakin kecil jaraknya (mendekati 0), semakin mirip (mendekati 100%)
    const similarity = Math.max(0, 1 - distance) * 100;

    return {
      kasusReferensi: kasus,
      distance: distance,
      similarity: similarity,
      details: { dGaji, dPekerjaan, dUmur, dTanggungan, dKendaraan },
    };
  });

  // 6. Urutkan hasil dari yang Paling Mirip (Similarity tertinggi) ke yang paling rendah
  return results.sort((a, b) => b.similarity - a.similarity);
};
