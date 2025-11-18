import React, { useState } from "react";

const TOKEN = "QN5gyknoKrcIUpydtsMdoLrTYTYpYS7i";

export default function MataKuliahForm({ onCreated }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sks, setSks] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!nama || !sks) {
      alert("Nama Mata Kuliah dan SKS wajib diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("https://pekris-webdev.vercel.app/api/matkul", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        // Sesuai Schema API: nama (string), deskripsi (string), sks (integer)
        body: JSON.stringify({
          nama,
          deskripsi,
          sks: parseInt(sks), // Pastikan dikirim sebagai angka
        }),
      });

      if (!res.ok) throw new Error("Gagal menambah mata kuliah");

      onCreated?.();
      setNama("");
      setDeskripsi("");
      setSks("");
      alert("Mata Kuliah berhasil ditambahkan! 📚");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
      <div className="bg-purple-50 px-6 py-3 border-b border-purple-100">
        <h3 className="text-purple-900 font-bold text-sm uppercase tracking-wide">
          ➕ Tambah Mata Kuliah
        </h3>
      </div>
      
      <form className="p-6 space-y-4" onSubmit={submit}>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Nama Mata Kuliah
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="Contoh: Algoritma Pemrograman"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Deskripsi
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Wajib / Pilihan"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              SKS
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="1-6"
              value={sks}
              onChange={(e) => setSks(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300"
        >
          {isLoading ? "Menyimpan..." : "Simpan Matkul"}
        </button>
      </form>
    </div>
  );
}