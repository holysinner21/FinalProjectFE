
import { useEffect, useState } from "react";
import TugasItem from "./TugasItem"; 

export default function TugasList({ refreshTrigger }) { 
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:8080/api/tugas";

  async function loadData() {
    setLoading(true);
    setError(""); 
    try {
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Gagal mengambil data tugas");

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
      <div className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
        <p className="mt-2 text-purple-600 font-medium">Memuat tugas...</p>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
        <p> {error}</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-900 flex items-center gap-2 border-b-4 border-yellow-400 inline-block pb-1">
          Daftar Tugas
        </h2>
        <button 
          onClick={loadData}
          className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
        >
          Refresh
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-10 bg-white border-2 border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500 text-lg">Hore! Tidak ada tugas pending.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {list.map((item) => (
            <TugasItem
              key={item.id}
              tugas={item}
              reload={loadData} 
            />
          ))}
        </div>
      )}
    </div>
  );
}