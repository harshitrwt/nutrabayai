'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Users, Clock, Loader2, Sparkles, Plus, Trash2, CheckCircle2, AlertCircle, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface Interviewer {
  id: string;
  name: string;
  availability: string;
}

export default function Scheduler() {
  const [groqApiKey, setGroqApiKey] = useState('');
  const [candidateAvailability, setCandidateAvailability] = useState('');
  const [interviewers, setInterviewers] = useState<Interviewer[]>([
    { id: '1', name: '', availability: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('groq_api_key');
    if (savedKey) setGroqApiKey(savedKey);
  }, []);

  const saveKey = (key: string) => {
    setGroqApiKey(key);
    localStorage.setItem('groq_api_key', key);
  };

  const addInterviewer = () => {
    setInterviewers([...interviewers, { id: Math.random().toString(36).substr(2, 9), name: '', availability: '' }]);
  };

  const removeInterviewer = (id: string) => {
    if (interviewers.length > 1) {
      setInterviewers(interviewers.filter(i => i.id !== id));
    }
  };

  const updateInterviewer = (id: string, field: 'name' | 'availability', value: string) => {
    setInterviewers(interviewers.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const loadExample = () => {
    setCandidateAvailability('Tue–Thu 2–5 PM, Fri 9 AM–12 PM');
    setInterviewers([
      { id: '1', name: 'Interviewer A', availability: 'Tue 3–6 PM' },
      { id: '2', name: 'Interviewer B', availability: 'Tue 1–4 PM' }
    ]);
  };

  const handleSchedule = async () => {
    if (!groqApiKey) {
      setError('Please provide a Groq API Key');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groqApiKey, candidateAvailability, interviewers })
      });
      const data = await resp.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.final_recommendation) {
      navigator.clipboard.writeText(result.final_recommendation);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl mt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Left Column: Inputs */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="text-primary w-6 h-6" />
                    Interview Scheduler
                  </CardTitle>
                  <CardDescription>Automate complex scheduling logic with AI</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={loadExample} className="text-xs h-8">
                  Load Example
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  Groq API Key <span className="text-destructive">*</span>
                </label>
                <Input 
                  type="password" 
                  placeholder="gsk_..." 
                  value={groqApiKey} 
                  onChange={(e) => saveKey(e.target.value)}
                  className="bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  Candidate Availability
                </label>
                <Textarea 
                  placeholder="E.g. Monday-Wednesday 2-5pm or Fri 9am-12pm" 
                  value={candidateAvailability}
                  onChange={(e) => setCandidateAvailability(e.target.value)}
                  className="min-h-[100px] resize-none bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    Interviewer Availability
                  </label>
                  <Button variant="ghost" size="sm" onClick={addInterviewer} className="h-7 px-2 text-primary hover:text-primary hover:bg-primary/10">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>
                
                <AnimatePresence initial={false}>
                  {interviewers.map((inv, index) => (
                    <motion.div 
                      key={inv.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 border-l-2 border-muted pl-4 py-2 relative group"
                    >
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Interviewer Name" 
                          value={inv.name}
                          onChange={(e) => updateInterviewer(inv.id, 'name', e.target.value)}
                          className="w-1/3 h-9 bg-muted/30 border-none"
                        />
                        <Input 
                          placeholder="Availability (e.g., Tue 3-6 PM)" 
                          value={inv.availability}
                          onChange={(e) => updateInterviewer(inv.id, 'availability', e.target.value)}
                          className="flex-1 h-9 bg-muted/30 border-none"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeInterviewer(inv.id)}
                          className="h-9 w-9 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleSchedule} 
                disabled={loading} 
                className="w-full relative overflow-hidden group shadow-lg shadow-primary/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Schedules...
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Match Best Slots
                  </>
                )}
                <div className="absolute inset-0 w-1/4 h-full bg-white/10 -skew-x-[30deg] -translate-x-full group-hover:translate-x-[400%] transition-transform duration-700" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Results */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {!result && !error && !loading && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4 border-2 border-dashed border-muted rounded-xl"
              >
                <div className="bg-primary/5 p-4 rounded-full">
                  <Calendar className="w-12 h-12 text-primary opacity-50" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">Ready to Analyze</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-xs">
                    Fill in the availability details and click "Match Best Slots" to generate recommendations.
                  </p>
                </div>
              </motion.div>
            )}

            {loading && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-6"
              >
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium animate-pulse">Running AI Conflicts Resolution...</p>
                  <p className="text-sm text-muted-foreground mt-1">Llama 3.3 is finding the perfect match.</p>
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-destructive/5 border border-destructive/20 rounded-xl flex items-start gap-4"
              >
                <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
                <div>
                  <h3 className="font-semibold text-destructive">Error Processing Request</h3>
                  <p className="text-sm text-destructive/80 mt-1">{error}</p>
                  <Button variant="outline" size="sm" className="mt-4 h-8 border-destructive/20 hover:bg-destructive/10" onClick={() => setError(null)}>
                    Try Again
                  </Button>
                </div>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <Card className="border-primary/20 bg-card/70 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-primary/20">Final Recommendation</Badge>
                      <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-8 w-8 text-muted-foreground">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium text-foreground leading-relaxed">
                      {result.final_recommendation}
                    </p>
                  </CardContent>
                </Card>

                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="w-full bg-muted/30">
                    <TabsTrigger value="summary" className="flex-1">AI Summary</TabsTrigger>
                    <TabsTrigger value="slots" className="flex-1">Suggested Slots</TabsTrigger>
                    <TabsTrigger value="conflicts" className="flex-1">Conflict Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary" className="p-0 pt-4">
                    <Card className="border-none shadow-none bg-transparent">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                          <ReactMarkdown>{result.markdown_summary}</ReactMarkdown>
                        </div>
                      </ScrollArea>
                    </Card>
                  </TabsContent>

                  <TabsContent value="slots" className="pt-4 space-y-3">
                    {result.top_slots.map((slot: any, i: number) => (
                      <div key={i} className="p-4 rounded-lg bg-muted/40 border border-muted flex items-start gap-3 group hover:border-primary/30 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{slot.time}</p>
                          <p className="text-xs text-muted-foreground mt-1">{slot.reasoning}</p>
                        </div>
                        <div className="ml-auto flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="conflicts" className="pt-4">
                    <Card className="bg-destructive/5 border-destructive/10">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-destructive/70 shrink-0 mt-0.5" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {result.conflict_analysis}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
