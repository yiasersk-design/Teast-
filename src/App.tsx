
import React, { useState, useEffect } from 'react';
import GoTemplateOverlay from './components/GoTemplateOverlay';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isGoTemplateOpen, setIsGoTemplateOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputValue("");
    
    // Simulate AI response
    setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "আমি আপনার বার্তা পেয়েছি।", sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center font-sans">
      
      <div className="w-full h-[100dvh] sm:w-[375px] sm:h-[667px] bg-white sm:rounded-[40px] shadow-2xl sm:border-[12px] border-slate-900 flex flex-col relative overflow-hidden">
        
        {/* Device Notch Area for desktop */}
        <div className="hidden sm:flex h-6 w-full bg-slate-900 justify-center items-end pb-1 shrink-0">
            <div className="w-24 h-4 bg-slate-900 rounded-full"></div>
        </div>

        {/* Header */}
        <header className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
           <button onClick={() => setIsSidebarOpen(true)} className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
              <i className="ph ph-list text-lg"></i>
           </button>
           <h1 className="text-lg font-bold text-slate-800 tracking-tight">App Workspace</h1>
           <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
              <div className="w-4 h-4 bg-slate-400 rounded-sm"></div>
           </button>
        </header>

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
           
           {/* Active Template Status Card */}
           <div className="space-y-4">
               <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Active Template</p>
                   <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                       <h2 className="text-xl font-semibold text-slate-900">Go-template.html</h2>
                   </div>
               </div>

               {/* Layout Preview Emulation (Geometric pattern) */}
               <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                   <div className="flex justify-between items-center">
                       <span className="text-xs font-medium text-slate-500">Layout Preview</span>
                       <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-600 uppercase">Source: Local</span>
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                       <div className="h-24 bg-slate-100 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2">
                           <div className="w-8 h-1 bg-slate-300"></div>
                           <div className="w-12 h-1 bg-slate-300"></div>
                       </div>
                       <div className="h-24 bg-slate-100 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2">
                           <div className="w-10 h-1 bg-slate-300"></div>
                           <div className="w-6 h-1 bg-slate-300"></div>
                       </div>
                       <div className="h-24 col-span-2 bg-slate-800 rounded-lg flex flex-col p-4 justify-end">
                           <div className="w-20 h-1 bg-slate-500 mb-1"></div>
                           <div className="w-32 h-2 bg-white"></div>
                       </div>
                   </div>
               </div>

               {/* Comparison List Item Rendering */}
               <div className="space-y-3">
                   <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                       <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">GT</div>
                           <div className="text-sm font-medium text-slate-700">Standard Rendering</div>
                       </div>
                       <div className="w-4 h-4 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center">
                           <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                       </div>
                   </div>

                   <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg opacity-50">
                       <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs italic">NA</div>
                           <div className="text-sm font-medium text-slate-400 line-through">Legacy Page System</div>
                       </div>
                       <div className="w-4 h-4 rounded-full border-2 border-slate-200"></div>
                   </div>
               </div>

               {/* Chat/Note Messages area if any */}
               <div className="space-y-3 pt-2">
                   {messages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] px-4 py-2.5 rounded-xl shadow-sm text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
                             {msg.text}
                          </div>
                      </div>
                   ))}
               </div>
           </div>
        </main>

        {/* Input Area integrated with theme spacing */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
           <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex flex-col focus-within:ring-2 ring-indigo-100 ring-offset-0 transition-all">
               <textarea 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 placeholder="Ask Meta AI or type a note..." 
                 rows={1}
                 className="w-full px-3 py-1 bg-transparent outline-none resize-none text-sm text-slate-700 placeholder-slate-400"
               />
               <div className="flex justify-between items-center mt-2 px-1">
                   <button className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                      <i className="ph ph-plus text-lg"></i>
                   </button>
                   <button 
                     onClick={handleSend}
                     disabled={!inputValue.trim()}
                     className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${inputValue.trim() ? 'bg-indigo-600 text-white scale-100 shadow-indigo-200' : 'bg-slate-200 text-slate-400 scale-90'}`}>
                      <i className="ph ph-paper-plane-tilt text-lg"></i>
                   </button>
               </div>
           </div>
        </div>

        {/* Bottom Nav */}
        <nav className="h-20 bg-white border-t border-slate-100 flex items-center justify-around px-4 pb-4 shrink-0">
           <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
               <div className="w-6 h-6 rounded bg-slate-400"></div>
               <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-600">Home</span>
           </button>
           
           <button onClick={() => setIsGoTemplateOpen(true)} className="flex flex-col items-center gap-1 group">
               <div className="w-6 h-6 rounded bg-indigo-600 shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform"></div>
               <span className="text-[9px] font-bold uppercase tracking-tighter text-indigo-600">Template</span>
           </button>

           <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
               <div className="w-6 h-6 rounded bg-slate-400"></div>
               <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-600">Store</span>
           </button>

           <button className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
               <div className="w-6 h-6 rounded bg-slate-400"></div>
               <span className="text-[9px] font-bold uppercase tracking-tighter text-slate-600">Settings</span>
           </button>
        </nav>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-200 rounded-full hidden sm:block"></div>
      </div>

      {/* Side Menu */}
      {isSidebarOpen && (
        <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[110]" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="fixed top-0 left-0 w-[280px] h-full bg-white z-[120] p-8 shadow-2xl space-y-8 animate-in slide-in-from-left duration-300">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-xl text-slate-800 tracking-tight">Menu</div>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                        <i className="ph ph-x text-2xl"></i>
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="text-left py-3 px-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                            <i className="ph ph-note text-xl"></i>
                        </div>
                        <span className="font-medium">Saved Notes</span>
                    </button>
                </div>
            </div>
        </>
      )}

      {/* NEW Page Template Overlay */}
      <GoTemplateOverlay 
        isOpen={isGoTemplateOpen} 
        onClose={() => setIsGoTemplateOpen(false)} 
      />

    </div>
  );
}
