'use client';

import SoftAurora from "@/components/SoftAurora";
import Scheduler from "@/components/Scheduler";
import { Sparkles, Calendar, Command } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-emerald-500/30 overflow-x-hidden">
 
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(125% 125% at 50% 100%, #000000 30%, #10b981 100%)`,
          backgroundSize: "100% 100%",
        }}
      />
      
      {/* Top Left Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] z-0" />

    
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-transparent sticky top-0 z-50"
      >
        <div className="md:mt-5 mt-2 container mx-auto px-4 h-16 flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Command className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              ScheduleAI
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs group-hover:text-white transition-colors">System Live</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 pt-24 pb-12 text-center max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-8"
        >
          The Future of Remote Hiring
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-black mb-8 tracking-tighter leading-[0.9] italic group drop-shadow-[0_0_30px_rgba(16,185,129,0.1)]"
        >
          RESOLVE <span className="italic">CONFLICTS</span> <br /> 
          <span className="bg-clip-text animate-gradient">INSTANTLY</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-muted-foreground text-md sm:text-lg mb-12 leading-relaxed max-w-2xl mx-auto font-medium"
        >
          Eliminate the "When are you free?" Hassle. Our AI analyzes 
          clashing schedules to find the <span className=" border-b border-emerald-500/50 text-emerald-600 hover:bg-emerald-500/10 transition-colors px-1 cursor-default">perfect window</span> in seconds.
        </motion.p>
      </div>

     
      <div className="relative w-full py-12 md:mt-[-70px] mt-[-100px]">
        
        
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          
          <SoftAurora 
            color1="#10b981" 
            color2="#000000" 
            brightness={1.2} 
            bandHeight={0.4} 
            speed={0.6}
            scale={5}
            enableMouseInteraction={false}
          />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10 bg-black/40 backdrop-blur-sm"
          >
            <video 
              src="/schedulevideo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>


      <div className="container mx-auto px-4 max-w-6xl relative z-10 mt-32">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="md:text-6xl text-center font-bold mb-4 italic text-white"
        >
          Scheduler
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <Scheduler />
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-40 border-t border-white/5 py-20 bg-black/80 backdrop-blur-lg mt-auto overflow-hidden relative z-10"
      >
        <div className="container  mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12 relative max-w-6xl">
          <div className="flex flex-col items-start gap-4 ">
            
            <div className="relative z-10">
              <h2 className="text-4xl font-black tracking-tighter text-white italic">
                Schedule<span className="text-emerald-500">AI</span>
              </h2>
              <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest">
                Optimized for Nutrabay's Productivity
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6 relative z-10">
            <div className="flex gap-4">
               {['TW', 'LD', 'GH'].map((item, index) => (
                 <motion.div 
                   key={item}
                   initial={{ opacity: 0, y: 10 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: 0.1 * index }}
                   className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer group"
                 >
                   <span className="text-xs font-bold group-hover:text-emerald-400">{item}</span>
                 </motion.div>
               ))}
            </div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-[0.2em]">
              BUILD_ID: 2.0.4-MVP | PROTOCOL_v1.0
            </p>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
