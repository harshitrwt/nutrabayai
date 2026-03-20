'use client';

import Scheduler from "@/components/Scheduler";
import { Sparkles, Calendar, Command } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Emerald Glow Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 100%, #000000 30%, #10b981 100%)`,
          backgroundSize: "100% 100%",
        }}
      />
      
      {/* Top Left Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] z-0" />

      {/* Navbar Inspired header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Command className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              ScheduleAI
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

      {/* Hero section */}
      <div className="container mx-auto px-4 pt-24 pb-12 text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8"
        >
          <Sparkles className="w-3 h-3" />
          The Future of Remote Hiring
        </motion.div>
        
        <h1 className="text-5xl sm:text-8xl font-black mb-8 tracking-tighter leading-[0.9] italic group drop-shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          RESOLVE <span className="text-emerald-500 not-italic">INSTANT</span> <br /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 animate-gradient">CONFLICTS</span>
        </h1>
        
        <p className="text-muted-foreground text-lg sm:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          Eliminate the "When are you free?" Hassle. Our AI analyzes 
          clashing schedules to find the <span className="text-white border-b border-emerald-500/50 hover:bg-emerald-500/10 transition-colors px-1 cursor-default">perfect window</span> in seconds.
        </p>
      </div>

      <Scheduler />

      <footer className="mt-40 border-t border-white/5 py-20 bg-black/80 backdrop-blur-lg mt-auto overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 relative max-w-6xl">
          <div className="flex flex-col items-start gap-4">
            
            <div className="relative z-10">
              <h2 className="text-4xl font-black tracking-tighter text-white italic">
                Schedule<span className="text-emerald-500">AI</span>
              </h2>
              <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest">
                Optimized for Productivity
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6 relative z-10">
            <div className="flex gap-4">
               {['TW', 'LD', 'GH'].map((item) => (
                 <div key={item} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer group">
                   <span className="text-xs font-bold group-hover:text-emerald-400">{item}</span>
                 </div>
               ))}
            </div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
              BUILD_ID: 2.0.4-MVP | PROTOCOL_v1.0
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
