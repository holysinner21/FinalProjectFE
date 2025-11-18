import React, { useState } from "react";

const TOKEN = "QN5gyknoKrcIUpydtsMdoLrTYTYpYS7i";

export default function MataKuliahItem({ matkul, reload }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!matkul) return null;

  async function remove() {
    const confirmMsg = `Yakin ingin menghapus mata kuliah "${matkul.nama}"?\n\nPERINGATAN: Tugas yang terkait dengan mata kuliah ini mungkin akan ikut terhapus atau error.`;
    if (!confirm(confirmMsg)) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`https://pekris-webdev.vercel.app/api/matkul/${matkul.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Gagal menghapus mata kuliah");
      }

      if (reload) reload();
      
    } catch (error) {
      alert("Gagal: " + error.message);
      setIsDeleting(false);
    }
  }

  return (
    <div className="group bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 flex flex-col justify-between h-full">
      
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors">
            {matkul.nama}
          </h3>
          <span className="flex-shrink-0 bg-yellow-300 text-purple-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
            {matkul.sks} SKS
          </span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {matkul.deskripsi || "Tidak ada deskripsi tersedia."}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">
          ID: {matkul.id}
        </span>

        <button
          onClick={remove}
          disabled={isDeleting}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors duration-200 flex items-center gap-1 border
            ${isDeleting 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border-transparent" 
              : "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            }`}
        >
          {isDeleting ? "Menghapus..." : " Hapus"}
        </button>
      </div>
    </div>
  );
}