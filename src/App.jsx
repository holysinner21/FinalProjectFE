import React, { useState } from "react";
import TugasForm from "./components/tugas/TugasForm";   
import TugasList from "./components/tugas/TugasList";
import MataKuliahList from "./components/matkul/MataKuliahList";
import MataKuliahForm from "./components/matkul/MataKuliahForm";

export default function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0); 
    const [refreshMatkul, setRefreshMatkul] = useState(0);   

    const handleTaskCreated = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleMatkulCreated = () => {
        setRefreshMatkul((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen w-full bg-gray-50 font-sans text-gray-900 flex flex-col">
            
            <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8 space-y-12">
                
                <header className="text-center space-y-3 pt-4">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-purple-900 tracking-tight">
                        TUGAS TRACKER
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        YOKK Tugasnya diselesain YOKK
                    </p>
                </header>

                <div className="space-y-16">
                    
                    <section className="space-y-8 bg-white/50 p-6 rounded-3xl border border-purple-50 shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-yellow-400 text-purple-900 p-2 rounded-lg text-xl">📝</span>
                            <h2 className="text-2xl font-bold text-purple-900">Tugas Kuliah</h2>
                        </div>

                        <div className="relative z-10"> 
                            <TugasForm onCreated={handleTaskCreated} />
                        </div>

                        <div key={`list-container-${refreshTrigger}`} className="animate-fade-in-up">
                            <TugasList refreshTrigger={refreshTrigger} /> 
                        </div>
                    </section>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-sm uppercase tracking-widest font-semibold">
                            Data Akademik
                        </span>
                        <div className="flex-grow border-t-2 border-dashed border-gray-300"></div>
                    </div>

                    <section className="grid md:grid-cols-3 gap-8 items-start">
                        
                        <div className="md:col-span-1 sticky top-4">
                             <div className="mb-4 flex items-center gap-2">
                                <span className="bg-purple-600 text-white p-1.5 rounded-md text-sm">📚</span>
                                <h3 className="font-bold text-lg text-gray-800">Input Matkul</h3>
                            </div>
                            <MataKuliahForm 
                                onCreated={handleMatkulCreated} 
                            />
                        </div>

                        <div className="md:col-span-2" key={`matkul-list-container-${refreshMatkul}`}>
                            <MataKuliahList 
                                refreshTrigger={refreshMatkul} 
                            />
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}