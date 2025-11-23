import React, { useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/matkul";

export default function MataKuliahForm({ onCreated }) { 
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [sks, setSks] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null); 

    async function submit(e) {
        e.preventDefault();
        setFormError(null);

        if (!nama || !sks) {
            setFormError("Nama Mata Kuliah dan SKS wajib diisi!");
            return;
        }

        if (parseInt(sks) < 1 || parseInt(sks) > 6) {
            setFormError("SKS harus antara 1 sampai 6.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(API_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nama,
                    deskripsi,
                    sks: parseInt(sks), 
                }),
            });

            if (!res.ok) throw new Error("Gagal menambah mata kuliah");

            onCreated?.();
            setNama("");
            setDeskripsi("");
            setSks("");
            console.log("Mata Kuliah berhasil ditambahkan! 📚"); 
            
        } catch (err) {
            console.error(`Error saat simpan: ${err.message}`); 
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
                {formError && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg flex items-center space-x-2">
                        <span className="w-4 h-4 text-lg">❌</span> 
                        <span>{formError}</span>
                    </div>
                )}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Nama Mata Kuliah
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Contoh: Kalkulus V"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                            Deskripsi (Wajib / Pilihan)
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
                            max="6"
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
                    className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                    {isLoading ? <>... Menyimpan...</> : "Simpan Matkul"} 
                </button>
            </form>
        </div>
    );
}