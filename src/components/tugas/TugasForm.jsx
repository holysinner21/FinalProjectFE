import React, { useState } from "react";

const TOKEN = "QN5gyknoKrcIUpydtsMdoLrTYTYpYS7i";

export default function TugasForm({ onCreated }) {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [deadline, setDeadline] = useState("");
  const [mataKuliahId, setMataKuliahId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (!nama || !deadline || !mataKuliahId) {
      alert("Mohon lengkapi Nama, Deadline, dan ID Mata Kuliah!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("https://pekris-webdev.vercel.app/api/tugas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          nama,
          deskripsi,
          deadline,
          mataKuliahId,
          status: "BELUM_DIKERJAKAN",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Gagal menambahkan tugas");
      }

      onCreated?.();
      
      setNama("");
      setDeskripsi("");
      setDeadline("");
      setMataKuliahId("");
      
      alert("Tugas berhasil ditambahkan! 🎉");
    } catch (err) {
      alert("Gagal: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-purple-100 mb-8">
      <div className="bg-purple-700 px-6 py-4 border-b-4 border-yellow-400">
        <h2 className="text-yellow-300 text-lg font-bold flex items-center gap-2">
          Tambah Tugas Baru
        </h2>
        <p className="text-purple-100 text-sm mt-1">
          Isi detail tugas di bawah ini dengan lengkap.
        </p>
      </div>

      <form className="p-6 space-y-5" onSubmit={submit}>
        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-1">
            Nama Tugas <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 placeholder-gray-400"
            placeholder="Contoh: Decimal to Binary"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-purple-900 mb-1">
            Deskripsi
          </label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 resize-none placeholder-gray-400"
            placeholder="Catatan tambahan (opsional)..."
            rows="3"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-1">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-purple-900 mb-1">
              ID Mata Kuliah <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200 placeholder-gray-400"
              placeholder="Masukkan ID Matkul"
              value={mataKuliahId}
              onChange={(e) => setMataKuliahId(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg shadow-sm font-bold text-sm transition-all duration-200 flex justify-center items-center gap-2
              ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-yellow-400 hover:bg-yellow-500 text-purple-900 hover:shadow-md active:scale-[0.98]"
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-purple-900" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </>
            ) : (
              "Simpan Tugas"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}