export const guidesData = [
  {
    id: "top-interview-questions-freshers-2026",
    slug: "top-interview-questions-freshers-2026",
    title: "16 Common Interview Questions for Freshers (2026 Guide)",
    category: "Interview Prep",
    readTime: "18 min read",
    date: "Oct 17, 2026",
    summary:
      "Prepare for fresher interviews with practical guidance on programming fundamentals, JavaScript coding, React, SQL, APIs, projects, HR questions, salary discussions, teamwork, and questions to ask recruiters.",
    tip: "Do not memorize interview answers word-for-word. Understand the structure of a strong answer, then explain it naturally using your own projects, skills, education, and experiences.",
    content: [
      {
        heading: "1. Tell Me About Yourself",
        body: "This is often the first question in an interview. Give the interviewer a quick professional overview of your education, skills, projects, and career goals. For most freshers, a clear introduction of around 45 to 90 seconds is enough.",
        points: [
          "Start with your education or graduation status.",
          "Mention two or three skills relevant to the role.",
          "Briefly describe a strong project, internship, or practical experience.",
          "Mention relevant achievements.",
          "End by explaining the opportunity you are looking for.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "I'm a Computer Science graduate with a strong interest in web development. I have worked with JavaScript, React, SQL, and REST APIs. One of my main projects was a job portal where I built job listing pages, search functionality, and database integration. That project helped me improve my frontend development and problem-solving skills. I'm now looking for an entry-level software development role where I can contribute to real projects while continuing to improve my technical skills.",
        mistake:
          "Avoid giving your complete life story, discussing unrelated personal details, or repeating every line of your resume.",
      },
      {
        heading: "2. What Are the Four Pillars of OOP?",
        body: "Object-oriented programming is a common topic in entry-level software interviews. Interviewers want to know whether you understand encapsulation, inheritance, polymorphism, and abstraction.",
        points: [
          "Encapsulation combines data and the methods that work with that data inside a class.",
          "Inheritance allows one class to reuse or extend features from another class.",
          "Polymorphism allows the same method or interface to behave differently depending on the object.",
          "Abstraction hides unnecessary implementation details and exposes only what is needed.",
        ],
        exampleTitle: "Simple Example",
        example:
          "Imagine a Vehicle class with a start() method. Car and Bike can inherit from Vehicle. Each may implement start() differently, demonstrating polymorphism. Private fields demonstrate encapsulation, while calling start() without knowing every internal step demonstrates abstraction.",
        mistake:
          "Do not only list the four names. Explain at least one with a real-world or coding example.",
      },
      {
        heading: "3. What Is the Difference Between SQL and NoSQL?",
        body: "SQL databases organize data in tables with defined relationships. NoSQL databases support models such as documents, key-value pairs, graphs, and wide-column stores.",
        points: [
          "SQL databases commonly use structured schemas and relationships.",
          "Examples include PostgreSQL, MySQL, and SQL Server.",
          "NoSQL databases can support more flexible data structures.",
          "Examples include MongoDB and Redis.",
          "The best choice depends on application requirements.",
        ],
        exampleTitle: "How to Explain It",
        example:
          "For a banking system that requires structured relationships and reliable transactions, I would usually consider a relational database. For an application where document structures change frequently, a document database such as MongoDB may be useful depending on the requirements.",
        mistake:
          "Avoid saying that SQL is old or NoSQL is always faster. Both approaches have different strengths and trade-offs.",
      },
      {
        heading: "4. Explain One of Your Projects",
        body: "Projects show how you apply technical knowledge. Interviewers often care more about what you personally built and learned than the number of technologies listed in your project.",
        points: [
          "Describe the problem your project solves.",
          "Explain the technologies you selected.",
          "Mention your individual contribution.",
          "Describe a technical challenge.",
          "Explain how you solved it.",
          "Mention what you would improve if you rebuilt the project.",
        ],
        exampleTitle: "Sample Structure",
        example:
          "I built a job portal using React for the frontend and Supabase for the backend. The goal was to help users discover job opportunities and view detailed listings. I worked on the frontend, routing, job filtering, database integration, and deployment. One challenge was keeping the UI synchronized with database data. I improved the data-fetching flow and handled loading and error states separately. The project taught me about building and deploying a complete web application.",
        mistake:
          "Explain your individual contribution instead of saying only that your team built the project.",
      },
      {
        heading: "5. What Is the Difference Between == and === in JavaScript?",
        body: "The double-equals operator can convert types before comparison, while the triple-equals operator compares without that type coercion.",
        points: [
          "5 == '5' evaluates to true because type conversion occurs.",
          "5 === '5' evaluates to false because the values have different types.",
          "Strict equality is generally easier to reason about.",
          "Using === helps avoid unexpected type-coercion behaviour.",
        ],
        exampleTitle: "Code Example",
        example: `const a = 5;
const b = "5";

console.log(a == b);  // true
console.log(a === b); // false`,
        mistake:
          "Explain type coercion instead of simply claiming that === is better.",
      },
      {
        heading: "6. Coding Practice: Find the Largest Number in an Array",
        body: "Entry-level programming interviews often include small problems that test your understanding of arrays, loops, comparisons, and edge cases. Explain your approach before writing code and test it with different inputs.",
        points: [
          "Understand the input and expected output.",
          "Use the first array element as the initial largest value.",
          "Compare each remaining element with the current largest value.",
          "Handle an empty array separately.",
          "Explain the time complexity of your solution.",
        ],
        exampleTitle: "Problem, Solution, and Output",
        example: `Problem:
Find the largest number in [12, 5, 27, 9, 18].

Solution:
function findLargest(numbers) {
  if (numbers.length === 0) {
    return null;
  }

  let largest = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > largest) {
      largest = numbers[i];
    }
  }

  return largest;
}

console.log(findLargest([12, 5, 27, 9, 18]));
// Output: 27`,
        mistake:
          "Do not initialize largest to zero, because an array may contain only negative numbers. Handle empty arrays and explain why the first element is used as the initial value.",
      },
      {
        heading: "7. What Are React Props and State?",
        body: "Props are values passed into a component, usually from a parent. State represents data that can change during the component's lifecycle or application flow.",
        points: [
          "Props are inputs passed to components.",
          "Props should generally be treated as read-only.",
          "State represents changing data.",
          "State changes can trigger component re-rendering.",
          "Keep state as simple and local as practical.",
        ],
        exampleTitle: "Simple Example",
        example:
          "If a parent component passes a username to a Profile component, the username is a prop. If Profile has a button that changes whether details are visible, the show/hide value can be stored in state.",
        mistake:
          "The important difference is where the data comes from and how it is managed.",
      },
      {
        heading: "8. What Is an API?",
        body: "An API allows software systems to communicate through defined requests and responses. Web applications commonly use APIs to retrieve, create, update, and delete data.",
        points: [
          "GET is commonly used to retrieve data.",
          "POST is commonly used to create data.",
          "PUT or PATCH is commonly used to update data.",
          "DELETE is commonly used to remove data.",
          "APIs often exchange data using JSON.",
        ],
        exampleTitle: "Practical Example",
        example:
          "When a user opens a jobs page, the frontend may send a GET request to an API. The server retrieves job records and returns them as JSON. React then displays those jobs on the page.",
        mistake:
          "An API is more than a URL. It defines how software systems interact.",
      },
      {
        heading: "9. What Are Your Strengths?",
        body: "Choose strengths relevant to the role and support them with evidence. A specific example is more convincing than a generic claim.",
        points: [
          "Choose one or two relevant strengths.",
          "Connect the strength to the position.",
          "Give a real example.",
          "Explain the positive outcome.",
          "Avoid exaggerated claims.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "One of my strengths is learning technical tools quickly. During a project, I needed to use Supabase even though I had not worked with it before. I studied the documentation, built a small test, and then integrated it into the project. This helped me become more confident when learning unfamiliar technologies.",
        mistake:
          "One well-supported strength is more convincing than several unsupported claims.",
      },
      {
        heading: "10. What Is Your Weakness?",
        body: "A strong weakness answer should be genuine, manageable, and accompanied by evidence that you are trying to improve.",
        points: [
          "Choose a real but manageable weakness.",
          "Explain its impact briefly.",
          "Describe what you are doing to improve.",
          "Show progress.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "Earlier, I sometimes spent too much time trying to solve programming problems alone before asking for help. Now I investigate the problem, document what I tried, and ask for help if I remain blocked. This helps me work more efficiently while still learning independently.",
        mistake:
          "Avoid claiming that you have no weaknesses or using a cliché without explaining how you are improving.",
      },
      {
        heading: "11. Why Should We Hire You?",
        body: "Freshers are not expected to have years of professional experience. Focus on your fundamentals, relevant projects, willingness to learn, and how your skills match the position.",
        points: [
          "Mention relevant technical skills.",
          "Highlight a strong project or internship.",
          "Show willingness to learn.",
          "Explain how your skills relate to the role.",
          "Focus on the employer's needs.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "I believe I can be a good fit because I have hands-on experience with technologies such as React, JavaScript, Git, and databases. I have used these skills to build projects rather than only learning concepts. As a fresher, I am comfortable receiving feedback and improving my skills.",
        mistake:
          "Focus on the value you can bring instead of saying only that you need the job.",
      },
      {
        heading: "12. Where Do You See Yourself in Three to Five Years?",
        body: "Interviewers use this question to understand whether your career direction aligns with the opportunity. Focus on skill development, increasing responsibility, and contribution.",
        points: [
          "Keep expectations realistic.",
          "Mention technical or professional growth.",
          "Show willingness to take more responsibility.",
          "Avoid unrealistic promises.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "Over the next three to five years, I want to become a dependable software developer with strong technical fundamentals and experience working on production applications. I would like to take ownership of larger features and improve my engineering skills as I gain experience.",
        mistake:
          "Explain a realistic career direction that relates to the role.",
      },
      {
        heading: "13. Are You Comfortable Working in a Team?",
        body: "Technology roles often require collaboration. Freshers can use college projects, internships, hackathons, volunteer work, or group assignments to demonstrate teamwork.",
        points: [
          "Use a specific situation.",
          "Explain your responsibility.",
          "Mention how the team communicated.",
          "Describe how blockers were handled.",
          "Explain the outcome.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "During a group project, four of us worked on different parts of a web application. I handled frontend integration while another teammate worked on the backend. We used GitHub and discussed API changes regularly. When integration issues appeared, we tested the API together and corrected the data format.",
        mistake: "Do not only say that you are a team player. Give an example.",
      },
      {
        heading: "14. How Do You Handle a Question You Cannot Answer?",
        body: "Interviewers do not expect candidates to know everything. Your response to an unfamiliar problem can demonstrate honesty, reasoning, and willingness to learn.",
        points: [
          "Stay calm.",
          "Do not invent an answer.",
          "Explain related concepts you understand.",
          "Ask for clarification if needed.",
          "Describe how you would investigate the problem.",
        ],
        exampleTitle: "Sample Response",
        example:
          "I'm not completely sure about the exact answer, so I don't want to guess. My understanding is that it is related to database indexing. I know indexes can improve certain read operations, but they also introduce storage and write overhead. I would need to review the specific implementation before giving a complete answer.",
        mistake:
          "A thoughtful partial answer is better than pretending to know something you do not.",
      },
      {
        heading: "15. What Salary Do You Expect?",
        body: "Research typical compensation for the position, company type, location, and required skills. Consider the complete compensation package rather than focusing only on one number.",
        points: [
          "Research realistic salary ranges.",
          "Understand whether the company has a fixed fresher package.",
          "Avoid unrealistic expectations.",
          "Consider benefits, learning opportunities, location, and role quality.",
          "Remain professional during negotiation.",
        ],
        exampleTitle: "Sample Answer",
        example:
          "As a fresher, my priority is finding a role where I can develop practical experience. Based on my research and the responsibilities of this position, I'm open to a competitive package within the company's normal range for entry-level candidates. I'm happy to understand the full compensation structure before discussing a specific figure.",
        mistake:
          "Do not say anything is fine if compensation matters to you. Research the role and market before discussing a figure.",
      },
      {
        heading: "16. What Questions Should You Ask the Interviewer?",
        body: "Use the opportunity to understand the role, team, expectations, and learning environment. Thoughtful questions can demonstrate genuine interest.",
        points: [
          "What would success look like during the first three months?",
          "What technologies does the team currently use?",
          "How are freshers mentored during onboarding?",
          "What type of projects would I initially work on?",
          "What are the biggest challenges the team is solving?",
          "What are the next steps in the interview process?",
        ],
        exampleTitle: "Good Closing Question",
        example:
          "Could you tell me what you would expect a successful new graduate joining this team to learn or accomplish during the first three to six months?",
        mistake:
          "Avoid saying that you have no questions every time. Ask about the role and expectations.",
      },
    ],
  },

  {
    id: "ats-friendly-resume-guide",
    slug: "ats-friendly-resume-guide",
    title: "How to Build an ATS-Friendly Software Developer Resume",
    category: "Resume Tips",
    readTime: "12 min read",
    date: "Oct 17, 2026",
    summary:
      "Learn how to create a clear software developer resume with practical examples, ATS-friendly formatting, relevant keywords, project descriptions, skills, and a final application checklist.",
    tip: "Never add keywords simply to pass an ATS. Include only skills and technologies you genuinely understand and can confidently explain during an interview.",
    content: [
      {
        heading: "1. What Is an Applicant Tracking System?",
        body: "An Applicant Tracking System (ATS) is software that organizations use to collect, organize, and review job applications. Recruiters may use these systems to search resumes for relevant skills, job titles, qualifications, and experience.",
        points: [
          "ATS software helps recruiters organize applications.",
          "Recruiters may search for relevant skills and job titles.",
          "Clear formatting can reduce parsing problems.",
          "Relevant keywords should accurately describe your experience.",
          "Your resume must also be readable and useful to a human recruiter.",
        ],
        exampleTitle: "Practical Example",
        example:
          "If a job description requests JavaScript, React, and REST API experience, make those skills easy to find in your resume if you genuinely have them. Support the skills with a project or work example wherever possible.",
        mistake:
          "Do not assume that a particular format or keyword guarantees that an ATS will select your resume.",
      },
      {
        heading: "2. Use a Simple Single-Column Layout",
        body: "A clean single-column resume makes the reading order easy to follow. Complex layouts can sometimes cause text to be extracted in an unexpected order by software, so simple formatting is a sensible choice for many software applications.",
        points: [
          "Use consistent margins.",
          "Choose a readable font.",
          "Use clear section spacing.",
          "Avoid unnecessary graphics and decorative elements.",
          "Keep important information as selectable text rather than images.",
          "Follow the employer's requested file format.",
        ],
        exampleTitle: "Recommended Structure",
        example:
          "Name and Contact Information\nProfessional Summary\nTechnical Skills\nProjects or Experience\nEducation\nCertifications",
        mistake:
          "Do not use a complicated template if it makes your contact information, skills, or project details difficult to read.",
      },
      {
        heading: "3. Use Standard Resume Section Names",
        body: "Familiar section headings help recruiters quickly locate relevant information. Choose headings that accurately describe your background instead of using creative labels that may be unclear.",
        points: [
          "Professional Summary",
          "Technical Skills",
          "Experience",
          "Internships",
          "Projects",
          "Education",
          "Certifications",
        ],
        exampleTitle: "For Freshers",
        example:
          "If you do not have full-time work experience, place your Projects and Education sections prominently. Include internships, academic projects, or other relevant practical work when applicable.",
        mistake:
          "Do not invent employment history to fill a section. Present academic projects and independent work honestly.",
      },
      {
        heading: "4. Tailor Your Resume to the Job Description",
        body: "Before applying, identify the role's main responsibilities, required technologies, qualifications, and experience expectations. Then make your relevant and genuine experience easy to find.",
        points: [
          "Read the entire job description.",
          "Identify the skills that genuinely match your background.",
          "Prioritize the most relevant projects.",
          "Use accurate terminology from the job description where appropriate.",
          "Remove unrelated details that distract from your fit.",
          "Never use invisible text or keyword stuffing.",
        ],
        exampleTitle: "Example",
        example:
          "For a frontend developer position, a project using React, JavaScript, HTML, CSS, and REST APIs may be more relevant than an unrelated project. Describe what you actually built and how you used those technologies.",
        mistake:
          "Do not claim experience with a technology simply because it appears in the job description.",
      },
      {
        heading: "5. Write Strong Project Descriptions",
        body: "Projects can provide important evidence of practical ability for candidates who have limited professional experience. Explain the purpose of each project, the tools used, your contribution, and the features you implemented.",
        points: [
          "Explain the problem your project addresses.",
          "Mention the main technologies.",
          "Describe your personal contribution.",
          "Highlight a technical challenge and how you approached it.",
          "Include measurable results only when they are genuine.",
          "Link to a working demo or repository when available.",
        ],
        exampleTitle: "Weak vs Better",
        example: `Weak:
Job Portal - React, Supabase, Bootstrap

Better:
Built a responsive job discovery platform using React and Supabase. Implemented job listings, job detail pages, routing, database integration, and reusable interface components.`,
        mistake:
          "Avoid listing technology names without explaining what you actually built. Adapt the example to your real work.",
      },
      {
        heading: "6. Write Clear, Action-Oriented Bullet Points",
        body: "Strong resume bullets begin with a clear action and explain the work performed. Where possible, describe the purpose or outcome without exaggerating your contribution.",
        points: [
          "Built a React dashboard for tracking job applications.",
          "Implemented API integration to retrieve and display job data.",
          "Created reusable UI components for common page elements.",
          "Added form validation to improve input handling.",
          "Documented project setup instructions for other developers.",
        ],
        exampleTitle: "A Useful Formula",
        example:
          "Action verb + what you built or changed + technology or method + result or purpose.",
        mistake:
          "Do not claim that you improved performance or saved time unless you have a reasonable basis for explaining that result.",
      },
      {
        heading: "7. Use Numbers Only When They Are Real",
        body: "Numbers can make achievements more specific, but invented statistics damage credibility. Include measurements only when you have actually measured them or can explain how they were obtained.",
        points: [
          "Number of features implemented.",
          "Number of records processed.",
          "Measured performance changes.",
          "Time saved through an actual automation.",
          "Number of users, when accurately known.",
        ],
        exampleTitle: "Example",
        example:
          "Instead of claiming that a project improved performance by 80% without evidence, explain the actual change you made, such as reducing repeated API requests or introducing pagination.",
        mistake:
          "Do not invent percentages, user counts, or business results just to make your resume look impressive.",
      },
      {
        heading: "8. Keep Your Technical Skills Section Focused",
        body: "A long list of technologies does not automatically make a stronger resume. Prioritize tools you can use and explain confidently, and organize them into clear groups.",
        points: [
          "Languages: JavaScript, Java, Python.",
          "Frontend: React, HTML, CSS.",
          "Backend: Node.js, Express.",
          "Databases: PostgreSQL, MySQL.",
          "Tools: Git, GitHub, VS Code.",
        ],
        exampleTitle: "How to Customize It",
        example:
          "Use these categories as a starting point, not a list to copy blindly. Remove technologies you have not actually used and add relevant skills from your own experience.",
        mistake:
          "Interviewers may ask about any skill you list. Do not claim proficiency based only on watching a tutorial.",
      },
      {
        heading: "9. Write a Useful Professional Summary",
        body: "A concise summary helps a recruiter understand your career stage, strongest relevant skills, and target role. Keep it specific to the kind of work you want to do.",
        points: [
          "Mention your education or career stage.",
          "Highlight your strongest technical area.",
          "Mention a relevant project or internship.",
          "Identify the type of role you are targeting.",
        ],
        exampleTitle: "Sample Summary",
        example:
          "Computer Science graduate focused on frontend and full-stack web development, with practical experience building React applications, integrating REST APIs, and working with relational databases. Seeking an entry-level software developer role to contribute to useful projects and continue developing engineering skills.",
        mistake:
          "Personalize the summary to match your actual education, skills, and projects. Do not present the sample as your own experience unless it is accurate.",
      },
      {
        heading: "10. Include Relevant Professional Links",
        body: "Professional links can help recruiters inspect your work beyond the resume. Check that every link works and leads to relevant, presentable material.",
        points: [
          "LinkedIn profile.",
          "GitHub profile.",
          "Portfolio website.",
          "Live project demonstrations.",
          "Relevant technical publications, if applicable.",
        ],
        exampleTitle: "Before Submitting",
        example:
          "Open each link in a private browser window or a different browser session to check that the intended public content is accessible.",
        mistake:
          "Do not include broken links or present copied tutorial repositories as entirely your own work.",
      },
      {
        heading: "11. Proofread Before Applying",
        body: "Spelling mistakes, inconsistent dates, broken links, and incorrect contact details can create a poor first impression. Review the final version before submitting an application.",
        points: [
          "Check your phone number and email address.",
          "Test LinkedIn, GitHub, and portfolio links.",
          "Verify education and employment dates.",
          "Check spelling and grammar.",
          "Use consistent formatting.",
          "Open the exported PDF and inspect every page.",
          "Use a clear file name.",
        ],
        exampleTitle: "Professional File Name",
        example: "YourName_Software_Developer_Resume.pdf",
        mistake:
          "Avoid unclear names such as final_resume_new_latest2.pdf or resume123.pdf.",
      },
      {
        heading: "12. Fresher Resume Checklist",
        body: "Use this checklist before submitting your resume. It focuses on clarity, relevance, and accuracy rather than promising a particular ATS score or an interview.",
        points: [
          "The resume clearly identifies the role you are targeting.",
          "Contact details are correct.",
          "Skills match your real abilities.",
          "Projects explain your individual contribution.",
          "Relevant keywords are used naturally and honestly.",
          "Dates, spelling, and formatting have been checked.",
          "Links work and support your application.",
          "The exported file is readable.",
        ],
        exampleTitle: "Final Review",
        example:
          "Compare your resume with the job description one last time. Make sure the most relevant evidence is easy to find and that every statement can be explained honestly in an interview.",
        mistake:
          "No resume layout guarantees selection. The purpose of this checklist is to improve readability and relevance.",
      },
    ],
  },

  {
    id: "off-campus-job-hunting-strategy",
    slug: "off-campus-job-hunting-strategy",
    title: "How Freshers Can Find Software Jobs Off Campus in 2026",
    category: "Job Search",
    readTime: "12 min read",
    date: "Oct 17, 2026",
    summary:
      "A practical guide for freshers looking for software developer jobs outside campus placements, covering job portals, company career pages, referrals, projects, applications, and interview preparation.",
    tip: "Build a consistent job-search routine. Focus on relevant openings, genuine applications, and improving your skills instead of applying randomly to hundreds of jobs.",
    content: [
      {
        heading: "1. Understand Off-Campus Hiring",
        body: "Off-campus hiring allows candidates to apply directly to employers without relying on their college placement process. Companies may recruit freshers through their career websites, job portals, referrals, recruitment events, and early-career programs.",
        points: [
          "Apply directly through company career pages.",
          "Search job portals for relevant entry-level openings.",
          "Look for graduate trainee and early-career programs.",
          "Build connections with people in your target industry.",
          "Track application deadlines and eligibility requirements.",
        ],
        exampleTitle: "Example",
        example:
          "A recent graduate interested in frontend development can search for fresher frontend developer, junior React developer, graduate engineer trainee, and associate software engineer openings.",
        mistake:
          "Do not assume every job advertised online is suitable for freshers. Read the eligibility requirements before applying.",
      },
      {
        heading: "2. Prepare Your Resume First",
        body: "Prepare a clear, accurate resume before starting a large number of applications. Recruiters should be able to identify your technical skills, projects, education, and contact information quickly.",
        points: [
          "Keep formatting simple and readable.",
          "Highlight relevant technical skills.",
          "Describe your projects and contributions.",
          "Include internships or practical experience when applicable.",
          "Check every contact detail and professional link.",
        ],
        exampleTitle: "For a Fresher",
        example:
          "If you have no full-time experience, prioritize relevant projects, technical skills, internships, and academic work rather than inventing employment history.",
        mistake:
          "Do not send the same poorly targeted resume to every employer without checking the role requirements.",
      },
      {
        heading: "3. Build Projects That Demonstrate Your Skills",
        body: "Practical projects give employers evidence of how you apply your technical knowledge. Choose projects that demonstrate the skills required for the roles you want.",
        points: [
          "Build a responsive website or web application.",
          "Use a database when the project requires persistent data.",
          "Integrate an API where appropriate.",
          "Handle loading, empty, and error states.",
          "Write clear project documentation.",
          "Publish a demo or repository when possible.",
        ],
        exampleTitle: "Project Ideas",
        example:
          "A job portal, task management application, expense tracker, or personal portfolio can demonstrate frontend development, data handling, and problem-solving when implemented well.",
        mistake:
          "Avoid building many unfinished projects. A few complete projects that you can explain confidently are often more useful.",
      },
      {
        heading: "4. Use Job Portals Effectively",
        body: "Job portals help candidates discover vacancies across companies and locations. Use search terms that match your experience level and target role.",
        points: [
          "Search for fresher software developer jobs.",
          "Try junior frontend developer and junior backend developer.",
          "Search for graduate trainee and associate engineer roles.",
          "Filter by location, experience, and date posted.",
          "Check the employer and application destination.",
          "Record the date and status of each application.",
        ],
        exampleTitle: "Search Strategy",
        example:
          "Try several related job titles instead of relying on a single search phrase. Employers may use different titles for similar entry-level positions.",
        mistake:
          "Do not apply automatically to every result. Confirm that the role, location, qualifications, and experience requirements fit your situation.",
      },
      {
        heading: "5. Check Official Company Career Pages",
        body: "Company career pages are useful for checking current vacancies and the employer's stated application requirements. They may also list graduate programs that are not easy to discover through general searches.",
        points: [
          "Create a list of target companies.",
          "Visit their official careers websites.",
          "Search for graduate, intern, trainee, and entry-level roles.",
          "Review eligibility and application deadlines.",
          "Save the official vacancy link.",
          "Check the application status when the company provides updates.",
        ],
        exampleTitle: "Simple Method",
        example:
          "Maintain a spreadsheet with the company name, role, official application link, deadline, eligibility, and date applied.",
        mistake:
          "Do not assume an old social media post means the vacancy is still open. Confirm the current status on the employer's official website.",
      },
      {
        heading: "6. Make Your LinkedIn Profile Useful",
        body: "A complete professional profile helps recruiters understand your background and makes it easier for people in your network to discover your interests.",
        points: [
          "Use a clear professional headline.",
          "Add your education and relevant skills.",
          "Describe completed projects accurately.",
          "Include GitHub or portfolio links.",
          "Keep your contact information up to date.",
          "Engage professionally with relevant industry posts.",
        ],
        exampleTitle: "Headline Example",
        example:
          "Aspiring Software Developer | React and JavaScript | Building Web Applications",
        mistake:
          "Only use technologies in your headline that reflect your actual knowledge and experience.",
      },
      {
        heading: "7. Ask for Referrals Professionally",
        body: "A referral request is an opportunity to introduce yourself and ask whether someone can guide you toward a suitable opening. A referral does not guarantee an interview or a job offer.",
        points: [
          "Identify employees at your target companies.",
          "Check whether a suitable vacancy exists.",
          "Write a short and respectful message.",
          "Mention the role and relevant background.",
          "Share your resume or job link when appropriate.",
          "Accept that the person may not be able to help.",
        ],
        exampleTitle: "Message Template",
        example: `Hi,

I am a recent graduate interested in entry-level software development opportunities. I found this role at your company and believe my project experience with the relevant technologies may be a good match.

Would you be comfortable referring me if you feel my profile is suitable? I can share my resume and the job link.

Thank you for your time.`,
        mistake:
          "Avoid sending repeated messages, demanding a referral, or asking strangers to recommend you without providing relevant information.",
      },
      {
        heading: "8. Practice Coding and Problem-Solving",
        body: "Many software hiring processes include coding questions, technical assessments, or discussions about how you solve problems. The exact requirements depend on the company and role.",
        points: [
          "Practice arrays and strings.",
          "Understand loops, functions, and conditionals.",
          "Learn common searching and sorting techniques.",
          "Practice hash maps, sets, and basic data structures.",
          "Explain your reasoning before writing code.",
          "Test edge cases and review your mistakes.",
        ],
        exampleTitle: "Practice Question",
        example:
          "Given an array of numbers, write a function that returns the largest number. Consider how your function should behave if the array is empty.",
        mistake:
          "Do not memorize solutions without understanding why they work. Practice explaining your approach and testing different inputs.",
      },
      {
        heading: "9. Prepare for Technical Interviews",
        body: "Interview preparation should cover both the fundamentals of your target role and the projects you mention on your resume. Be prepared to explain your decisions and discuss what you would improve.",
        points: [
          "Review the main technologies listed in the vacancy.",
          "Understand the projects on your resume.",
          "Practice explaining your code.",
          "Review relevant language and framework fundamentals.",
          "Prepare to discuss technical challenges.",
          "Practice coding under reasonable time limits.",
        ],
        exampleTitle: "React Preparation",
        example:
          "If you apply for a React role, review components, props, state, hooks, event handling, rendering, API requests, and common loading or error states.",
        mistake:
          "Do not claim advanced expertise if you cannot explain the fundamentals of the technology.",
      },
      {
        heading: "10. Prepare for HR and Behavioral Questions",
        body: "Employers may ask about your background, interests, teamwork, challenges, and reasons for applying. Clear, honest answers help them understand how you approach work.",
        points: [
          "Prepare a concise self-introduction.",
          "Explain why you want the role.",
          "Describe a project challenge you faced.",
          "Give an example of learning something new.",
          "Discuss teamwork or disagreement honestly.",
          "Prepare thoughtful questions for the interviewer.",
        ],
        exampleTitle: "Answer Structure",
        example:
          "For questions about a challenge, explain the situation, your responsibility, the action you took, and the outcome. Use a real example from a project, internship, or academic experience.",
        mistake:
          "Avoid memorized answers that sound unnatural or include achievements you cannot support.",
      },
      {
        heading: "11. Apply Consistently and Track Progress",
        body: "A simple application tracker helps you remember which roles you applied for, when to follow up, and what to prepare next.",
        points: [
          "Record the company and role.",
          "Save the original job description or link.",
          "Record the application date.",
          "Track assessment and interview dates.",
          "Note follow-up dates when appropriate.",
          "Review outcomes to identify areas for improvement.",
        ],
        exampleTitle: "Suggested Tracker Columns",
        example:
          "Company | Role | Location | Application Link | Date Applied | Status | Next Step | Notes",
        mistake:
          "Do not rely entirely on memory or repeatedly apply to the same vacancy without checking your existing records.",
      },
      {
        heading: "12. Avoid Job Scams",
        body: "Job seekers should verify employers and recruitment processes before sharing sensitive information. Fraudulent listings may imitate real companies or promise guaranteed employment in exchange for money.",
        points: [
          "Verify vacancies through official company channels.",
          "Check the sender's email domain carefully.",
          "Be cautious about requests for application or interview fees.",
          "Never share passwords or one-time verification codes.",
          "Do not provide banking credentials to supposed recruiters.",
          "Verify unusual document or payment requests independently.",
        ],
        exampleTitle: "Warning Sign",
        example:
          "A recruiter claiming to guarantee a job in exchange for an upfront payment deserves careful scrutiny. Verify the opportunity directly with the company before proceeding.",
        mistake:
          "Do not assume a professional-looking message or company logo proves that a recruiter is legitimate.",
      },
      {
        heading: "13. Improve Your Applications Using Feedback",
        body: "Job searching is also a learning process. Reviewing your application history can help you decide whether to improve your resume, strengthen a technical skill, or practice interviews.",
        points: [
          "Review which applications match your skills best.",
          "Look for repeated assessment difficulties.",
          "Practice topics you struggle to explain.",
          "Ask for constructive feedback when available.",
          "Update project documentation and examples.",
          "Make changes based on evidence rather than guesswork.",
        ],
        exampleTitle: "Practical Adjustment",
        example:
          "If you repeatedly struggle with JavaScript coding assessments, spend focused practice time on the concepts and problem types that cause difficulty before attempting similar assessments again.",
        mistake:
          "Do not interpret every rejection as proof that you lack ability. Hiring decisions can depend on many factors, including role requirements and competition.",
      },
      {
        heading: "14. Follow a Weekly Job Search Routine",
        body: "A realistic weekly routine helps balance applications with skill development. Adjust the workload to your availability and the quality of the openings you find.",
        points: [
          "Review relevant vacancies on a regular schedule.",
          "Apply to roles that match your background.",
          "Spend dedicated time practicing technical skills.",
          "Improve one project or portfolio item.",
          "Follow up on applications when appropriate.",
          "Review progress at the end of the week.",
        ],
        exampleTitle: "Example Weekly Plan",
        example:
          "Monday: review vacancies and plan applications.\nTuesday: submit relevant applications.\nWednesday: practice coding.\nThursday: improve a project and portfolio.\nFriday: prepare for interviews and review application status.\nWeekend: revise difficult topics and plan the next week.",
        mistake:
          "Treat this as a flexible example, not a requirement to follow every activity on a specific day.",
      },
      {
        heading: "15. Your Off-Campus Job Search Checklist",
        body: "Before starting your next application cycle, check that your resume, portfolio, target roles, and preparation routine are ready.",
        points: [
          "My resume is accurate and easy to read.",
          "My professional links work.",
          "I can explain the projects on my resume.",
          "I have identified relevant job titles.",
          "I check eligibility before applying.",
          "I use official application links whenever possible.",
          "I track applications and interview dates.",
          "I practice technical and behavioral questions.",
          "I verify suspicious job offers.",
          "I review my progress and adjust my approach.",
        ],
        exampleTitle: "Remember",
        example:
          "There is no guaranteed number of applications that will result in a job. Focus on suitable opportunities, honest applications, practical skills, and steady improvement.",
        mistake:
          "Do not pay someone who promises a guaranteed job or interview without independently verifying the legitimacy of the service.",
      },
    ],
  },
];
