# Walkthrough: AI Interview Scheduler

This MVP solves the complex problem of manual interview scheduling by using high-performance AI to find the optimal common free time among candidates and multiple interviewers.

## Key Features

- **Messy Text Support**: Candidates and recruiters can paste free-text availability (e.g., "M-W 2-5pm").
- **AI-Powered Matching**: Uses Groq's Llama 3.3 model to logically intersect schedules and resolve conflicts in milliseconds.
- **Conflict Analysis**: Provides a detailed breakdown of why certain slots were avoided.
- **Premium UI**: Built with Next.js, shadcn/ui, and Framer Motion for a state-of-the-art recruiter experience.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **AI Engine**: Groq API (Llama 3.3-70b-versatile)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion

## How to Use
2. **Define Availability**: Enter the candidate's window and add as many interviewers as needed.
3. **Analyze**: Click "Match Best Slots". The AI will return the top 3 options along with a detailed reasoning markdown and a final recommendation.
4. **Copy**: Use the copy button to grab the final recommendation for your invite email.


