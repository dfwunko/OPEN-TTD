import React, { useEffect } from 'react';
import { CloakPreset } from '../types/game';
import {
  Folder,
  FileText,
  Search,
  Grid,
  Menu,
  MoreVertical,
  Calendar,
  CheckCircle2,
  HardDrive
} from 'lucide-react';

interface CloakDisguiseProps {
  preset: CloakPreset;
  hotkey: string;
  onRestore: () => void;
}

export const CloakDisguise: React.FC<CloakDisguiseProps> = ({
  preset,
  hotkey,
  onRestore
}) => {
  // Update document title and favicon temporarily
  useEffect(() => {
    const originalTitle = document.title;
    if (preset === 'classroom') {
      document.title = 'Classes - Google Classroom';
    } else if (preset === 'drive') {
      document.title = 'My Drive - Google Drive';
    } else if (preset === 'docs') {
      document.title = 'Untitled document - Google Docs';
    } else if (preset === 'wikipedia') {
      document.title = 'Cellular respiration - Wikipedia';
    } else {
      document.title = 'Dashboard - Canvas LMS';
    }

    return () => {
      document.title = originalTitle;
    };
  }, [preset]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-slate-800 font-sans select-none">
      {/* Discreet restore button at bottom corner */}
      <button
        onClick={onRestore}
        className="fixed bottom-3 right-3 z-50 bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-mono px-3 py-1.5 rounded-full shadow-lg border border-slate-700 backdrop-blur-sm cursor-pointer transition-opacity opacity-30 hover:opacity-100 flex items-center gap-1.5"
        title={`Press ${hotkey} or click to return to Nova Arcade`}
      >
        <span>Return to Arcade ({hotkey})</span>
      </button>

      {preset === 'classroom' && (
        <div className="min-h-screen bg-slate-50 flex flex-col">
          {/* Google Classroom Navbar */}
          <header className="h-16 border-b border-slate-200 bg-white px-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-sm">
                  C
                </div>
                <span className="font-semibold text-lg text-slate-700">Google Classroom</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
                <Grid className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                S
              </div>
            </div>
          </header>

          {/* Main Classroom Feed */}
          <main className="max-w-6xl mx-auto w-full p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Class Card 1 */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg hover:underline cursor-pointer">
                      AP European History
                    </h3>
                    <MoreVertical className="w-5 h-5 opacity-80" />
                  </div>
                  <p className="text-xs text-blue-100 mt-1">Period 2 · Dr. Harrison</p>
                </div>
                <div className="p-4 min-h-[140px] flex flex-col justify-between text-xs text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Due Tomorrow, 11:59 PM</p>
                    <p className="hover:text-blue-600 cursor-pointer">
                      Chapter 14 DBQ: Industrial Revolution Primary Analysis
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-end">
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
                      <Folder className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Class Card 2 */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-emerald-700 to-teal-700 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg hover:underline cursor-pointer">
                      AP Biology Honors
                    </h3>
                    <MoreVertical className="w-5 h-5 opacity-80" />
                  </div>
                  <p className="text-xs text-emerald-100 mt-1">Period 4 · Mrs. Vance</p>
                </div>
                <div className="p-4 min-h-[140px] flex flex-col justify-between text-xs text-slate-600">
                  <div>
                    <p className="font-semibold text-slate-700 mb-1">Due Friday</p>
                    <p className="hover:text-emerald-700 cursor-pointer">
                      Photosynthesis & Cellular Respiration Lab Report
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-end">
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
                      <Folder className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Class Card 3 */}
              <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="bg-gradient-to-r from-amber-700 to-orange-700 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg hover:underline cursor-pointer">
                      Pre-Calculus AB
                    </h3>
                    <MoreVertical className="w-5 h-5 opacity-80" />
                  </div>
                  <p className="text-xs text-amber-100 mt-1">Period 5 · Mr. Miller</p>
                </div>
                <div className="p-4 min-h-[140px] flex flex-col justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Woohoo, no work due soon!</span>
                  </div>
                  <div className="border-t border-slate-100 pt-2 flex justify-end">
                    <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500">
                      <Folder className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {preset === 'drive' && (
        <div className="min-h-screen bg-slate-50 flex flex-col">
          {/* Drive Header */}
          <header className="h-16 border-b border-slate-200 bg-white px-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HardDrive className="w-6 h-6 text-amber-500" />
              <span className="font-semibold text-xl text-slate-700">Google Drive</span>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search in Drive"
                  className="w-full bg-slate-100 rounded-full pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              S
            </div>
          </header>

          <main className="max-w-6xl mx-auto w-full p-6">
            <h2 className="text-base font-semibold text-slate-700 mb-3">Suggested Folders</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {['APUSH Notes 2026', 'Chemistry Lab Writeups', 'Literature Essays', 'Calculus Problem Sets'].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg shadow-xs cursor-pointer hover:bg-slate-50">
                  <Folder className="w-5 h-5 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-700 truncate">{f}</span>
                </div>
              ))}
            </div>

            <h2 className="text-base font-semibold text-slate-700 mb-3">Files</h2>
            <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden shadow-xs">
              {[
                { name: 'Unit_4_Cell_Metabolism_Review.pdf', size: '2.4 MB', date: 'Yesterday' },
                { name: 'Harrison_Period2_DBQ_Outline.docx', size: '142 KB', date: '2 days ago' },
                { name: 'Trigonometric_Identities_CheatSheet.pdf', size: '840 KB', date: 'Sep 18' }
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 hover:bg-slate-50 text-xs">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold text-slate-700">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-slate-500">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {preset === 'wikipedia' && (
        <div className="min-h-screen bg-white">
          <header className="border-b border-slate-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-2xl tracking-tighter">W</span>
              <span className="font-serif text-lg">WIKIPEDIA</span>
              <span className="text-xs text-slate-500 ml-2">The Free Encyclopedia</span>
            </div>
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                readOnly
                value="Cellular respiration"
                className="w-full border border-slate-300 rounded px-2.5 pl-8 py-1 text-xs text-slate-700"
              />
            </div>
          </header>

          <main className="max-w-4xl mx-auto p-8 font-serif">
            <h1 className="text-3xl font-serif border-b border-slate-300 pb-2 mb-4 text-slate-900">
              Cellular respiration
            </h1>
            <p className="text-sm leading-relaxed text-slate-700 mb-4">
              <b>Cellular respiration</b> is the set of metabolic reactions and processes that take place in the cells of organisms to convert biochemical energy from nutrients into adenosine triphosphate (ATP), and then release waste products. The reactions involved in respiration are catabolic reactions, which break large molecules into smaller ones, releasing energy because weak high-energy bonds, in particular in molecular oxygen, are replaced by stronger bonds in the products.
            </p>
            <p className="text-sm leading-relaxed text-slate-700 mb-4">
              Nutrients that are commonly used by animal and plant cells in respiration include sugar, amino acids, and fatty acids, and the most common oxidizing agent is molecular oxygen (O<sub>2</sub>). The energy stored in ATP can then be used to drive processes requiring energy, including biosynthesis, locomotion or transport of molecules across cell membranes.
            </p>
          </main>
        </div>
      )}
    </div>
  );
};
