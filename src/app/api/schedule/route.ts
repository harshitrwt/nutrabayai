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
            content: `You are an AI Scheduling Assistant for an HR team. Your task is to analyze candidate and interviewer availability and find the best 1-hour interview slots.

            INPUT:
            - Candidate Availability
            - Interviewer Availability (Multiple interviewers)

            OUTPUT REQUIREMENTS (JSON ONLY):
            1. top_slots: Array of 3 objects with { time, reasoning }. Rank them by best fit.
            2. conflict_analysis: String explaining any major overlaps or impossibilities.
            3. final_recommendation: String with the single best slot and a logical justification.
            4. markdown_summary: A comprehensive markdown report.
               CRITICAL: 
               - Start with "## Findings".
               - Followed by "## Availability Grid".
               - The table MUST be preceded by TWO entirely empty lines.
               - The table header and the separator row (|---|---|) MUST have exactly one newline between them.
               - Separate EACH data row with exactly one newline.
               - End the table with TWO entirely empty lines.
               
               Terminology: Use "Interviewer" for staff roles.

            RULES:
            - A slot is "Strong Fit" if ALL interviewers and the candidate are free.
            - A slot is "Moderate Fit" if most but not all are free.
            - Prioritize slots that accommodate all parties.
            - Be concise but professional.`
          },
          {
            role: 'user',
            content: `
            Candidate Availability: ${candidateAvailability}
            Interviewers:
            ${interviewers.map((inv: any) => `- ${inv.name}: ${inv.availability}`).join('\n')}
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
