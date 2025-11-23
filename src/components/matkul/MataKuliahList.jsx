
import { useEffect, useState } from "react";
import MataKuliahItem from './MataKuliahItem';


export default function MataKuliahList({ refreshTrigger }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL ="http://localhost:8080/api/matkul";


  async function loadData() {
    setLoading(true);
    setError(""); 
    try {
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Gagal mengambil data mata kuliah");

      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

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
              <MataKuliahItem
                key={item.id}
                matkul={item}
                reload={loadData} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}