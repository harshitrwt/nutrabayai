import Scheduler from "@/components/Scheduler";
import { Sparkles, Calendar } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* Background patterns */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      {/* Navbar Inspired header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              AI Scheduler
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs group-hover:text-white transition-colors">System Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section inside container */}
      <div className="container mx-auto px-4 pt-16 pb-8 text-center max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter leading-tight italic">
          RESOLVE <span className="text-primary italic">INSTANT</span> <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">CONFLICTS</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Stop the endless scheduling loop. Our AI-powered engine finds the perfect intersection 
          of 5+ calendars in milliseconds.
        </p>
      </div>

      <Scheduler />

      <footer className="mt-32 border-t border-white/5 py-12 bg-black/80 backdrop-blur-lg mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex gap-4">
             <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
               <span className="text-[10px] font-bold">TW</span>
             </div>
             <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
               <span className="text-[10px] font-bold">LD</span>
             </div>
             <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer">
               <span className="text-[10px] font-bold">GH</span>
             </div>
          </div>
          
        </div>
      </footer>
    </main>
  );
}
