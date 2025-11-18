import React, { useState } from "react";

const TOKEN = "QN5gyknoKrcIUpydtsMdoLrTYTYpYS7i";

export default function TugasItem({ tugas, reload }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!tugas) return null;

  async function toggleStatus() {
    setIsUpdating(true);
    const newStatus = tugas.status === "SELESAI" ? "BELUM_DIKERJAKAN" : "SELESAI";

    try {
      const res = await fetch(`https://pekris-webdev.vercel.app/api/tugas/${tugas.id}`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}` 
        },
        body: JSON.stringify({
            ...tugas,
            status: newStatus,
            mataKuliahId: tugas.mataKuliahId || tugas.mataKuliah?.id
        })
      });

      if (!res.ok) throw new Error("Gagal update status");
      reload();
    } catch (err) {
      alert("Gagal update: " + err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  async function remove() {
    if (!confirm(`Yakin ingin menghapus tugas "${tugas.nama}"?`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`https://pekris-webdev.vercel.app/api/tugas/${tugas.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      if (!res.ok) throw new Error("Gagal menghapus tugas");
      reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  const getStatusColor = (status) => {
    return status === "SELESAI"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const formatDate = (dateString) => {
    try {
        return new Date(dateString).toLocaleDateString("id-ID", {
            weekday: "long", year: "numeric", month: "long", day: "numeric",
        });
    } catch (e) {
        return dateString;
    }
  };

  return (
    <div className={`rounded-xl shadow-sm border transition-all duration-200 flex flex-col h-full bg-white border-purple-100 hover:shadow-md`}>
      <div className="bg-purple-50 px-5 py-3 border-b border-purple-100 flex justify-between items-center">
        <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
           {tugas.mataKuliah?.nama || "Matkul Umum"}
        </span>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(tugas.status)}`}>
          {tugas.status ? tugas.status.replace("_", " ") : "STATUS"}
        </span>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
            <h3 className={`text-lg font-bold text-gray-800 mb-2 ${tugas.status === "SELESAI" ? "line-through text-gray-400" : ""}`}>
                {tugas.nama}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {tugas.deskripsi || "-"}
            </p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
          <div className="flex flex-col">
             <span className="text-[10px] text-gray-400 uppercase font-bold">Deadline</span>
             <span className="text-xs font-medium text-red-500">
                {formatDate(tugas.deadline)}
             </span>
          </div>

          <div className="flex gap-2">
            <button
                onClick={toggleStatus}
                disabled={isUpdating}
                className={`p-2 rounded-lg transition-colors ${tugas.status === 'SELESAI' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                title={tugas.status === 'SELESAI' ? "Batalkan Selesai" : "Tandai Selesai"}
            >
                {isUpdating ? "⏳" : (tugas.status === 'SELESAI' ? "↩️" : "✅")}
            </button>

            <button 
                onClick={remove} 
                disabled={isDeleting}
                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100"
                title="Hapus Tugas"
            >
                {isDeleting ? "..." : "🗑️"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}