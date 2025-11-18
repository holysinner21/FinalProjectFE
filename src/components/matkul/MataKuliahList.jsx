import { useEffect, useState } from "react";

export default function MataKuliahList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://pekris-webdev.vercel.app/api/matkul";
  const TOKEN = "QN5gyknoKrcIUpydtsMdoLrTYTYpYS7i";

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Gagal mengambil data");

        const data = await res.json();
        setList(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading)
    return (
      <div className="max-w-4xl mx-auto mt-8 px-4 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-purple-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3 w-full">
            <div className="h-24 bg-purple-100 rounded-xl w-full"></div>
            <div className="h-24 bg-purple-100 rounded-xl w-full"></div>
          </div>
          <p className="mt-4 text-purple-600 font-medium">
            Sedang memuat daftar mata kuliah...
          </p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
        <p className="font-bold text-lg">Terjadi Kesalahan</p>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2 border-b-4 border-yellow-400 inline-block pb-1">
          Daftar Mata Kuliah
        </h2>
        <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
          Total: {list.length}
        </span>
      </div>

      <div className="space-y-4">
        {list.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Belum ada data mata kuliah.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {list.map((item) => (
              <div
                key={item.id}
                className="group bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors">
                      {item.nama}
                    </h3>
                    <span className="flex-shrink-0 bg-yellow-300 text-purple-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                      {item.sks} SKS
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.deskripsi || "Tidak ada deskripsi tersedia."}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-50">
                    <span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                        ID: {item.id}
                    </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}