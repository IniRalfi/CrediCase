// app/page.tsx
"use client";

import { useState } from "react";
import { CaseTable } from "@/components/CaseTable";
import { InputForm } from "@/components/InputForm";
import { ResultVisualization } from "@/components/ResultVisualization";
import { calculateCBR, CbrResult } from "@/lib/cbr";

export default function Home() {
  const [results, setResults] = useState<CbrResult[] | null>(null);

  const handleCalculate = (data: {
    gaji: number;
    pekerjaan: string;
    umur: number;
    tanggungan: number;
    kendaraan: number;
  }) => {
    // Panggil fungsi algoritma CBR dari Step 4
    const cbrOutput = calculateCBR(data);
    setResults(cbrOutput);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Analisis</h2>
        <p className="text-slate-500 mt-2 text-lg">
          Evaluasi kelayakan kredit nasabah menggunakan metode Case-Based Reasoning (CBR).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Area Kiri: Form Input */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xl font-semibold text-slate-800">1. Data Nasabah Baru</h3>
          <InputForm onCalculate={handleCalculate} />
        </div>

        {/* Area Kanan: Tabel Kasus & Visualisasi Hasil */}
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800">
              2. Knowledge Base (Kasus Referensi)
            </h3>
            <CaseTable />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-800">3. Hasil Analisis Sistem</h3>

            {results ? (
              <ResultVisualization results={results} />
            ) : (
              <div className="p-6 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex flex-col items-center justify-center h-48 text-slate-400">
                <svg
                  className="w-10 h-10 mb-3 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Belum ada data yang dianalisis.</p>
                <p className="text-sm mt-1">Silakan isi form nasabah baru di sebelah kiri.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
