
import React, { useState, useEffect, useRef } from 'react';

interface GoTemplateOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoTemplateOverlay: React.FC<GoTemplateOverlayProps> = ({ isOpen, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [usedTemplates, setUsedTemplates] = useState<boolean[]>(new Array(7).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const children = Array.from(container.children);
      const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
        const rect = (child as HTMLElement).getBoundingClientRect();
        const childCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleUse = () => {
    const next = [...usedTemplates];
    // If setting one to true, set others to false (exclusive choice as per music player UI logic usually)
    const currentStatus = next[activeIndex];
    next.fill(false);
    next[activeIndex] = !currentStatus;
    setUsedTemplates(next);
  };

  if (!isOpen) return null;

  const templates = [
    { id: 1, content: "Template 1 Content (Bengali Text)" },
    { id: 2, content: "Template 2 Content" },
    { id: 3, content: "Template 3 Content" },
    { id: 4, content: "Template 4 Content" },
    { id: 5, content: "Template 5 Content" },
    { id: 6, content: "Template 6 Content" },
    { id: 7, content: "Template 7 Content" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 overflow-hidden flex flex-col slide-up animate-in fade-in duration-500">
      <div id="playerContainer" className="relative flex-1 flex flex-col bg-slate-50">
        
        {/* Themed Header */}
        <nav className="nav-header px-6 bg-white border-b border-slate-100 shadow-sm">
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors" title="Back">
             <i className="ph ph-arrow-left text-2xl"></i>
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"><i className="ph ph-magnifying-glass text-xl"></i></button>
            <button onClick={() => setIsPopupOpen(true)} className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors"><i className="ph ph-dots-three-vertical text-xl"></i></button>
          </div>
        </nav>

        {/* Carousel Area */}
        <div ref={containerRef} className="album-art-container px-12 py-8 overflow-y-hidden">
          {templates.map((t, i) => (
            <div 
              key={t.id} 
              className={`album-art bg-white border-2 transition-all duration-300 ${i === activeIndex ? 'active scale-100 border-indigo-600 shadow-xl' : 'scale-90 opacity-40 border-slate-200'} ${usedTemplates[i] ? 'magic-border-active ring-4 ring-indigo-100 ring-offset-2' : ''}`}
            >
              <div className="canvas-container bg-white">
                <div className="p-10 text-slate-800 text-xs bg-white h-full overflow-hidden text-justify space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="font-bold text-slate-900">Template {t.id} {lang === 'bn' ? 'বাংলা' : 'English'} Title</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: 00{t.id}</div>
                    </div>
                    <p className="leading-relaxed font-medium">
                        {lang === 'bn' 
                         ? "পলাশীর যুদ্ধ ১৭৫৭ সালের ২৩শে জুন সংঘটিত হয়েছিল। এই যুদ্ধে রবার্ট ক্লাইভের নেতৃত্বে ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানি বাংলার নবাব সিরাজউদ্দৌলাকে পরাজিত করে।"
                         : "The Battle of Plassey took place on 23 June 1757. In this battle, the British East India Company, led by Robert Clive, defeated the Nawab of Bengal, Siraj ud-Daulah."}
                    </p>
                    <div className="pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-slate-500 italic">
                            <i className="ph ph-info"></i>
                            <p>{lang === 'bn' ? "সময় বদলায়, মানুষ বদলায়।" : "Moral: Time changes, people change."}</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="action-buttons px-8 pb-12">
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl h-14 flex items-center px-5 gap-6">
             <div className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer">
                <i className="ph ph-thumbs-up text-xl"></i>
                <span className="text-sm font-bold">28k</span>
             </div>
             <div className="w-px h-6 bg-slate-100"></div>
             <div className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <i className="ph ph-thumbs-down text-xl"></i>
             </div>
          </div>

          <button onClick={toggleUse} className={`flex-1 h-14 rounded-2xl px-6 flex items-center justify-between transition-all duration-300 shadow-sm ${usedTemplates[activeIndex] ? 'bg-indigo-600 text-white shadow-indigo-200' : 'bg-white text-slate-700 border border-slate-200'}`}>
             <span className="text-sm font-bold tracking-tight uppercase">{usedTemplates[activeIndex] ? 'Using' : 'Apply template'}</span>
             <div className={`w-10 h-6 rounded-full relative transition-colors ${usedTemplates[activeIndex] ? 'bg-indigo-400' : 'bg-slate-200'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-300 ${usedTemplates[activeIndex] ? 'left-5' : 'left-1'}`}></div>
             </div>
          </button>
          
          <button className="bg-white border border-slate-200 w-14 h-14 rounded-2xl flex items-center justify-center text-slate-500 hover:bg-slate-50 shadow-sm transition-colors">
            <i className="ph ph-share-network text-xl"></i>
          </button>
        </div>

        {/* Bottom Options Sheet */}
        <div className={`t-popup-overlay backdrop-blur-[2px] transition-all duration-300 ${isPopupOpen ? 'active opacity-100' : 'opacity-0'}`} onClick={() => setIsPopupOpen(false)}></div>
        <div className={`t-popup-sheet bg-white px-8 py-10 transition-all duration-500 ease-out border-t border-slate-100 shadow-2xl ${isPopupOpen ? 'active' : ''}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Options</h2>
            <button onClick={() => setIsPopupOpen(false)} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><i className="ph ph-x text-xl"></i></button>
          </div>
          
          <div className="flex gap-4 mb-10">
            <button 
              onClick={() => setLang('en')}
              className={`flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${lang === 'en' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}>
                <i className="ph ph-globe text-2xl"></i>
                <span className="text-xs font-bold uppercase tracking-wider">English</span>
            </button>
            <button 
              onClick={() => setLang('bn')} 
              className={`flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${lang === 'bn' ? 'bg-indigo-50 border-indigo-600 text-indigo-600 scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100'}`}>
                <i className="ph ph-translate text-2xl"></i>
                <span className="text-xs font-bold uppercase tracking-wider">Bengali</span>
            </button>
            <button className="flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 bg-slate-50 text-slate-400 border-2 border-transparent">
                <i className="ph ph-plus-circle text-2xl"></i>
                <span className="text-xs font-bold uppercase tracking-wider">Add</span>
            </button>
          </div>

          <div className="space-y-2">
             {[
               { icon: 'ph-broadcast', label: 'Start mix', color: 'text-indigo-600' },
               { icon: 'ph-info', label: 'Inquiry', color: 'text-slate-600' },
               { icon: 'ph-trash', label: 'Dismiss queue', color: 'text-red-500' }
             ].map((item, idx) => (
                 <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <i className={`ph ${item.icon} text-2xl ${item.color}`}></i>
                        <span className="font-semibold text-slate-700">{item.label}</span>
                    </div>
                    <i className="ph ph-caret-right text-slate-300 group-hover:translate-x-1 transition-transform"></i>
                 </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoTemplateOverlay;
