import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { candidateAvailability, interviewers } = await req.json();
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json({ error: 'Groq API Key (GROQ_API_KEY) is not configured in the server.' }, { status: 500 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are an expert AI Interview Scheduling System. Your goal is to solve complex scheduling conflicts with 100% accuracy.

            TASK:
            Analyze candidate and interviewer availability to find the most optimal 1-hour interview slots. 

            QUALIFICATION CRITERIA FOR YOUR RESPONSE:
            - Problem Understanding: Accurately identify the overlapping windows between the Candidate and ALL Interviewers.
            - Practical Execution: Suggested slots must be real, valid overlaps. No "hallucinated" availability.
            - Output Quality: Reasoning must be logical and mention specific participants by name.
            - Simplicity & Clarity: Use a clear markdown structure for the human-readable summary.
            - Conflict Resolution: If no slot works for EVERYONE, find the best compromise (max attendance) and explicitly state who is missing.

            LOGIC STEPS:
            1. Parse all time strings into a unified mental timeline.
            2. Identify 1-hour windows where the Candidate is free.
            3. For each window, verify which Interviewers are also free.
            4. Rank slots by number of participants available (Max is Candidate + All Interviewers).

            OUTPUT REQUIREMENTS (Strict JSON):
            1. top_slots: Array of 3 objects { time, participants_available, missing_participants, reasoning }. Rank by attendance first, then by time.
            2. conflict_analysis: A detailed breakdown of why certain times don't work (e.g., "Ganesh is only available Wed, while Harshit is only Sun; therefore, a full-panel interview is impossible").
            3. final_recommendation: The #1 best option with a strong justification.
            4. markdown_summary: 
               - Start with "# Scheduling Analysis"
               - "## Executive Summary" (2-3 sentences)
               - "## Availability Comparison"
               - "## Findings" (The reasoning for top choices)
               - "## Availability Grid" (Detailed Table)
                 - CRITICAL TABLE FORMAT:
                   - The table MUST be preceded by TWO entirely empty lines.
                   - Terminology: Use "Interviewer" for staff.
                   - Columns: [Slot/Day, Candidate, Interviewer Name 1, Interviewer Name 2, ...]
                   - Content: "Available" or "Busy" or specific times.

            IMPORTANT: If a 100% overlap between all parties is mathematically impossible, you MUST clearly state this in the conflict_analysis and provide the next best options.`
          },
          {
            role: 'user',
            content: `
            SCENARIO:
            Interview scheduling involves multiple back-and-forth emails.
            Your task is to build a system that finds top 3 slots, resolves conflicts, and gives a final recommendation.

            INPUTS PROVIDED:
            - Candidate Availability: ${candidateAvailability}
            - Interviewers:
            ${interviewers.map((inv: any) => `- ${inv.name}: ${inv.availability}`).join('\n')}

            Remember the evaluation criteria: Problem Understanding, Practical Execution, Output Quality, Simplicity & Clarity, and Creativity.
            `
          }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(data.choices[0].message.content));
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
