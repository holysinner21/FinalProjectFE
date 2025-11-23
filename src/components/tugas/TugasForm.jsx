
import React, { useState, useEffect } from "react";

const API_TUGAS_URL = "http://localhost:8080/api/tugas";
const API_MATKUL_URL = "http://localhost:8080/api/matkul"; 

export default function TugasForm({ onCreated }) {
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [deadline, setDeadline] = useState("");
    const [mataKuliahId, setMataKuliahId] = useState("");
    const [listMatkul, setListMatkul] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        async function fetchMatkul() {
            try {
                const res = await fetch(API_MATKUL_URL); 
                
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Gagal memuat Matkul: ${res.status} ${errorText}`);
                }

                const data = await res.json();
                setListMatkul(Array.isArray(data) ? data : []);
                
                if (data.length > 0 && !mataKuliahId) {
                    setMataKuliahId(data[0].id);
                }
            } catch (error) {
                console.error("Error di fetchMatkul:", error); 
                setFormError(`Gagal memuat daftar Mata Kuliah. Pastikan Backend berjalan: ${error.message}`);
            }
        }
        fetchMatkul();
    }, [mataKuliahId]);

    async function submit(e) {
        e.preventDefault();
        setFormError(null);

        if (!nama || !deadline || !mataKuliahId) {
            setFormError("Nama Tugas, Deadline, dan Mata Kuliah wajib diisi!");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch(API_TUGAS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nama,
                    deskripsi,
                    deadline: deadline, 
                    mataKuliahId: mataKuliahId,
                    status: 'BELUM_DIKERJAKAN' 
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Gagal menambah tugas. ${errorText}`);
            }

            onCreated?.(); 
            
            setNama("");
            setDeskripsi("");
            setDeadline("");
            
        } catch (err) {
            console.error(`Error saat simpan tugas: ${err.message}`);
            setFormError(`Gagal menyimpan: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-md border border-purple-100 overflow-hidden">
            <div className="bg-purple-50 px-6 py-3 border-b border-purple-100">
                <h3 className="text-purple-900 font-bold text-sm uppercase tracking-wide">
                    ➕ Tambah Tugas Baru
                </h3>
            </div>
            
            <form className="p-6 space-y-4" onSubmit={submit}>
                {formError && (
                    <div className="p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
                        ❌ {formError}
                    </div>
                )}
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Tugas</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Contoh: Tugas Kelompok Kalkulus"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mata Kuliah</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-white"
                            value={mataKuliahId}
                            onChange={(e) => setMataKuliahId(e.target.value)}
                            required
                            disabled={listMatkul.length === 0 || isLoading}
                        >
                            <option value="">
                                {listMatkul.length === 0 ? "Memuat Matkul..." : "Pilih Matkul..."}
                            </option>
                            {listMatkul.map(matkul => (
                                <option key={matkul.id} value={matkul.id}>
                                    {matkul.nama}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deadline</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Deskripsi (Opsional)</label>
                    <textarea
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                        placeholder="Detail instruksi tugas..."
                        rows="2"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                    ></textarea>
                </div>


                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                    {isLoading ? <>... Menyimpan...</> : "Simpan Tugas"} 
                </button>
            </form>
        </div>
    );
}