import { useEffect, useState } from "react";

export default function TugasList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "https://pekris-webdev.vercel.app/api/tugas";
  const TOKEN = "QN5gyknoKrcIUpydtsMdoLrTYTYpYS7i";

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

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
  }, []);

  const getStatusColor = (status) => {
    return status === "SELESAI"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <div className="bg-purple-50 px-5 py-3 border-b border-purple-100 flex justify-between items-center">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                   {item.mataKuliah?.nama || "Matkul Umum"}
                </span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                  {item.status.replace("_", " ")}
                </span>
              </div>

              <div className="p-5 flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                  {item.nama}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.deskripsi || "Tidak ada deskripsi tambahan."}
                </p>
                
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                  <span>Deadline:</span>
                  <span className="font-medium text-red-500">
                    {formatDate(item.deadline)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}