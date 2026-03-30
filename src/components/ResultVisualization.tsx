// components/ResultVisualization.tsx
import { CbrResult } from "@/lib/cbr";
import { Badge } from "@/components/ui/badge";

export function ResultVisualization({ results }: { results: CbrResult[] }) {
  if (!results || results.length === 0) return null;

  // Hasil terbaik adalah index ke-0 karena sudah di-sort dari yang paling mirip
  const bestMatch = results[0];

  return (
    <div className="space-y-6">
      {/* Kartu Keputusan Utama */}
      <div
        className={`p-6 rounded-xl border-2 text-center ${
          bestMatch.kasusReferensi.status === "Sangat Layak"
            ? "bg-green-50 border-green-200"
            : bestMatch.kasusReferensi.status === "Layak"
              ? "bg-blue-50 border-blue-200"
              : "bg-red-50 border-red-200"
        }`}
      >
        <h3 className="text-lg font-semibold text-slate-700 mb-2">Keputusan Sistem:</h3>
        <div className="text-3xl font-black uppercase tracking-wider mb-2">
          <span
            className={
              bestMatch.kasusReferensi.status === "Sangat Layak"
                ? "text-green-600"
                : bestMatch.kasusReferensi.status === "Layak"
                  ? "text-blue-600"
                  : "text-red-600"
            }
          >
            {bestMatch.kasusReferensi.status}
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Berdasarkan kemiripan tertinggi dengan{" "}
          <strong>
            Kasus #{bestMatch.kasusReferensi.id} ({bestMatch.kasusReferensi.nama})
          </strong>
        </p>
      </div>

      {/* Visualisasi Detail Perhitungan (Untuk Dosen) */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
        <h4 className="font-semibold text-slate-800 border-b pb-2">
          Detail Perhitungan CBR (Jarak Euclidean)
        </h4>

        {results.map((result, idx) => (
          <div key={idx} className="space-y-2 mb-4 p-4 border border-dashed rounded-lg bg-slate-50">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm">
                Bandingkan dgn Kasus #{result.kasusReferensi.id} ({result.kasusReferensi.nama})
              </span>
              <Badge variant={idx === 0 ? "default" : "secondary"}>
                {result.similarity.toFixed(2)}% Mirip
              </Badge>
            </div>

            {/* Progress Bar Visualisasi Kemiripan */}
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${idx === 0 ? "bg-blue-600" : "bg-slate-400"}`}
                style={{ width: `${result.similarity}%` }}
              ></div>
            </div>

            {/* Breakdown Jarak */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2 text-xs text-slate-500">
              <div>Δ Gaji: {result.details.dGaji.toFixed(3)}</div>
              <div>Δ Pekerjaan: {result.details.dPekerjaan.toFixed(3)}</div>
              <div>Δ Umur: {result.details.dUmur.toFixed(3)}</div>
              <div>Δ Tangg: {result.details.dTanggungan.toFixed(3)}</div>
              <div>Δ Kendaraan: {result.details.dKendaraan.toFixed(3)}</div>
            </div>
            <div className="text-xs text-slate-700 mt-1 font-medium">
              Total Jarak (Distance): {result.distance.toFixed(4)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
