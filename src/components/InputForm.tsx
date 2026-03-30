// components/InputForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface InputFormProps {
  onCalculate: (data: {
    gaji: number;
    pekerjaan: string;
    umur: number;
    tanggungan: number;
    kendaraan: number;
  }) => void;
}

export function InputForm({ onCalculate }: InputFormProps) {
  const [formData, setFormData] = useState({
    gaji: "",
    pekerjaan: "",
    umur: "",
    tanggungan: "",
    kendaraan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Konversi string ke number sebelum dikirim ke fungsi algoritma
    onCalculate({
      gaji: Number(formData.gaji),
      pekerjaan: formData.pekerjaan,
      umur: Number(formData.umur),
      tanggungan: Number(formData.tanggungan),
      kendaraan: Number(formData.kendaraan),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl border shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="gaji">Rata-rata Gaji (Rp)</Label>
        <Input
          id="gaji"
          name="gaji"
          type="number"
          placeholder="Contoh: 8000000"
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pekerjaan">Jenis Pekerjaan</Label>
        <select
          id="pekerjaan"
          name="pekerjaan"
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          required
        >
          <option value="">Pilih Pekerjaan...</option>
          <option value="PNS">PNS</option>
          <option value="Pegawai Swasta">Pegawai Swasta</option>
          <option value="Wiraswasta">Wiraswasta</option>
          <option value="Freelance">Freelance</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="umur">Umur (Tahun)</Label>
          <Input
            id="umur"
            name="umur"
            type="number"
            placeholder="Contoh: 30"
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tanggungan">Tanggungan (Orang)</Label>
          <Input
            id="tanggungan"
            name="tanggungan"
            type="number"
            placeholder="Contoh: 2"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="kendaraan">Jumlah Kendaraan</Label>
        <Input
          id="kendaraan"
          name="kendaraan"
          type="number"
          placeholder="Contoh: 1"
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full mt-2 bg-slate-900 hover:bg-slate-800 text-white">
        Analisis Kelayakan
      </Button>
    </form>
  );
}
