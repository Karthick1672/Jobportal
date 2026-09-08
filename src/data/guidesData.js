export const guidesData = [
  {
    id: "top-interview-questions-freshers-2026",
    slug: "top-interview-questions-freshers-2026",
    title:
      "Top 15 Technical & HR Interview Questions for Freshers (2026 Guide)",
    category: "Interview Prep",
    readTime: "15 min read",
    date: "Sep 8, 2026",

    summary:
      "Prepare for common fresher interviews with practical guidance on self-introduction, JavaScript, React, SQL, APIs, projects, HR questions, salary discussions, teamwork, and smart questions to ask recruiters.",

    tip: "Do not memorize interview answers word-for-word. Understand the structure of a strong answer, then explain it naturally using your own projects, skills, education, and experiences.",

    content: [
      {
        heading: "1. Tell Me About Yourself",

        body: "This is often the first question in an interview. Your answer should give the interviewer a quick professional overview of who you are, what you know, what you have built, and what kind of opportunity you are looking for. For most freshers, a clear introduction of around 45 to 90 seconds is enough.",

        points: [
          "Start with your current education or graduation status.",
          "Mention two or three skills relevant to the role.",
          "Briefly describe one strong project, internship, or practical experience.",
          "Mention an achievement only if it is relevant.",
          "End by explaining what type of opportunity you are looking for.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "I'm a 2026 Computer Science graduate with a strong interest in web development. I have worked with JavaScript, React, SQL, and REST APIs. One of my main projects was a job portal where I built job listing pages, search functionality, and database integration. That project helped me improve my frontend development and problem-solving skills. I'm now looking for an entry-level software development role where I can contribute to real projects while continuing to improve my technical skills.",

        mistake:
          "Avoid giving your complete life story, discussing unrelated personal details, or simply repeating every line of your resume.",
      },

      {
        heading: "2. What Are the Four Pillars of OOP?",

        body: "Object-oriented programming is a common topic in entry-level software interviews. Interviewers usually want to know whether you understand encapsulation, inheritance, polymorphism, and abstraction rather than whether you can simply memorize their definitions.",

        points: [
          "Encapsulation combines data and the methods that work with that data inside a class.",
          "Inheritance allows one class to reuse or extend features from another class.",
          "Polymorphism allows the same method or interface to behave differently depending on the object.",
          "Abstraction hides unnecessary implementation details and exposes only what is needed.",
        ],

        exampleTitle: "Simple Example",

        example:
          "Imagine a Vehicle class with a start() method. Car and Bike can inherit from Vehicle. Each may implement start() differently, which demonstrates polymorphism. Private fields such as engineStatus demonstrate encapsulation, while the user only needs to call start() without knowing every internal step, which demonstrates abstraction.",

        mistake:
          "Do not only list the four names. Be prepared to explain at least one of them with a simple real-world or coding example.",
      },

      {
        heading: "3. What Is the Difference Between SQL and NoSQL?",

        body: "Interviewers usually want to understand whether you know when relational and non-relational databases are useful. SQL databases organize data in structured tables with relationships, while NoSQL databases can use flexible models such as documents, key-value pairs, graphs, or wide-column stores.",

        points: [
          "SQL databases commonly use structured schemas and relationships.",
          "Examples include PostgreSQL, MySQL, and SQL Server.",
          "NoSQL databases can support more flexible data structures.",
          "Examples include MongoDB and Redis.",
          "The best choice depends on the application's requirements.",
        ],

        exampleTitle: "How to Explain It",

        example:
          "For a banking system where transactions and relationships must remain highly consistent, I would usually consider a relational database. For an application where document structures change frequently, a document database such as MongoDB may be useful depending on the requirements.",

        mistake:
          "Avoid saying that SQL is old or NoSQL is always faster. Both approaches solve different problems and involve different trade-offs.",
      },

      {
        heading: "4. Explain One of Your Projects",

        body: "Project discussions are especially important for freshers because projects show how you apply technical knowledge. Interviewers often care more about what you personally built and learned than the number of technologies listed in your project.",

        points: [
          "Describe the problem your project solves.",
          "Explain the technologies you selected.",
          "Mention your individual contribution.",
          "Describe one technical challenge.",
          "Explain how you solved or worked around that challenge.",
          "Mention what you would improve if you rebuilt the project.",
        ],

        exampleTitle: "Sample Structure",

        example:
          "I built a job portal using React for the frontend and Supabase for the backend. The goal was to help users discover job opportunities and view detailed listings. I worked mainly on the frontend, routing, job filtering, database integration, and deployment. One challenge was keeping the UI synchronized with database data. I solved it by restructuring the data-fetching flow and handling loading and error states separately. The project taught me a lot about building and deploying a complete web application.",

        mistake:
          "Do not say 'we built this' for every answer without explaining your individual contribution. Interviewers need to understand what you personally worked on.",
      },

      {
        heading: "5. What Is the Difference Between == and === in JavaScript?",

        body: "JavaScript interviews commonly include basic language questions. The double-equals operator performs type coercion before comparison, while the triple-equals operator compares values without converting the operands to the same type first.",

        points: [
          "5 == '5' evaluates to true because type conversion occurs.",
          "5 === '5' evaluates to false because one value is a number and the other is a string.",
          "Strict equality is generally easier to reason about.",
          "Using === can help avoid unexpected type-coercion behaviour.",
        ],

        exampleTitle: "Code Example",

        example: `const a = 5;
const b = "5";

console.log(a == b);  // true
console.log(a === b); // false`,

        mistake:
          "Do not simply say that === is better without explaining the reason. Mention type coercion and the comparison of types.",
      },

      {
        heading: "6. What Are React Props and State?",

        body: "For entry-level React roles, interviewers often ask how components receive and manage data. Props are values passed into a component, usually from a parent, while state represents data that can change during the component's lifecycle or application flow.",

        points: [
          "Props are inputs passed to components.",
          "Props should generally be treated as read-only.",
          "State represents changing data.",
          "State changes can trigger component re-rendering.",
          "Keep state as simple and local as practical.",
        ],

        exampleTitle: "Simple Example",

        example:
          "If a parent component passes a username to a Profile component, that username is a prop. If Profile has a button that changes whether details are visible, the show/hide value can be stored in state.",

        mistake:
          "Do not describe props and state as the same thing. The important difference is where the data comes from and how it is managed.",
      },

      {
        heading: "7. What Is an API?",

        body: "An API allows software systems to communicate through defined requests and responses. In web development, frontend applications commonly communicate with backend services through APIs to retrieve, create, update, or delete data.",

        points: [
          "GET is commonly used to retrieve data.",
          "POST is commonly used to create data.",
          "PUT or PATCH is commonly used to update data.",
          "DELETE is commonly used to remove data.",
          "APIs often exchange data using JSON.",
        ],

        exampleTitle: "Practical Example",

        example:
          "When a user opens a jobs page, the React frontend might send a GET request to an API. The server retrieves job records from the database and returns them as JSON. React then displays those jobs on the page.",

        mistake:
          "Avoid defining an API only as a URL. An API is an interface or contract that defines how software systems interact.",
      },

      {
        heading: "8. What Are Your Strengths?",

        body: "Choose strengths that are relevant to the role and support them with evidence. Interviewers usually learn more from a specific example than from generic statements such as 'I am hardworking.'",

        points: [
          "Choose one or two relevant strengths.",
          "Connect the strength to the position.",
          "Give a real example.",
          "Explain the positive outcome.",
          "Avoid exaggerated claims.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "One of my strengths is that I learn technical tools quickly. During one of my projects, I needed to use Supabase even though I had not worked with it before. I studied the documentation, built a small test first, and then integrated it into the project. That experience helped me become more confident when learning unfamiliar technologies.",

        mistake:
          "Avoid listing several generic strengths without evidence. One well-supported strength is more convincing than five unsupported claims.",
      },

      {
        heading: "9. What Is Your Weakness?",

        body: "A strong weakness answer should be genuine, manageable, and accompanied by evidence that you are trying to improve. The goal is not to pretend that you have no weaknesses but to show self-awareness and progress.",

        points: [
          "Choose a real but manageable weakness.",
          "Avoid weaknesses that make you completely unsuitable for the position.",
          "Explain the impact briefly.",
          "Describe what you are doing to improve.",
          "Show progress.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "Earlier, I sometimes spent too much time trying to solve programming problems completely by myself before asking for help. I realized that this could slow down progress. Now I first investigate the problem, document what I tried, and then ask for help if I am still blocked. This has made me more efficient while still allowing me to learn independently.",

        mistake:
          "Avoid answers such as 'I work too hard' or 'I'm a perfectionist' unless they are genuinely true and you can explain their real impact.",
      },

      {
        heading: "10. Why Should We Hire You?",

        body: "Freshers are not expected to have many years of professional experience. Instead, focus on your fundamentals, relevant projects, willingness to learn, ability to solve problems, and how your skills match the position.",

        points: [
          "Mention relevant technical skills.",
          "Highlight a strong project or internship.",
          "Show willingness to learn.",
          "Explain how your skills relate to the role.",
          "Keep the answer focused on the employer's needs.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "I believe I can be a good fit because I already have hands-on experience with several technologies mentioned in the role, including React, JavaScript, Git, and databases. I have used these skills to build complete projects rather than only learning the concepts. As a fresher, I also understand that I still have a lot to learn, and I'm comfortable receiving feedback and improving quickly.",

        mistake:
          "Do not answer only with 'because I am hardworking' or 'because I need this job.' Focus on the value you can bring to the role.",
      },

      {
        heading: "11. Where Do You See Yourself in Three to Five Years?",

        body: "Interviewers often use this question to understand whether your general career direction aligns with the opportunity. Your answer does not need to predict an exact job title. Focus instead on skill development, increasing responsibility, and contribution.",

        points: [
          "Keep your expectations realistic.",
          "Mention technical or professional growth.",
          "Show willingness to take more responsibility.",
          "Avoid unrealistic titles or salary targets.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "Over the next three to five years, I want to become a dependable software developer with strong technical fundamentals and experience working on production applications. I would like to take ownership of larger features, improve my system-design knowledge, and gradually help newer team members as I gain experience.",

        mistake:
          "Avoid giving an answer that makes the current role sound like a temporary stop before you immediately leave for something unrelated.",
      },

      {
        heading: "12. Are You Comfortable Working in a Team?",

        body: "Most technology roles require collaboration. Freshers can use college projects, internships, hackathons, volunteer work, or group assignments to demonstrate teamwork.",

        points: [
          "Use a specific situation.",
          "Explain your responsibility.",
          "Mention how the team communicated.",
          "Describe how disagreements or blockers were handled.",
          "Explain the outcome.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "Yes. During a group project, four of us worked on different parts of a web application. I handled the frontend integration while another teammate worked on the backend. We used GitHub to manage our code and regularly discussed API changes so the frontend and backend remained compatible. When we had integration issues, we tested the API together and fixed the data format instead of blaming one side.",

        mistake:
          "Do not only say 'yes, I am a team player.' Give an example that demonstrates how you actually worked with others.",
      },

      {
        heading: "13. How Do You Handle a Question You Cannot Answer?",

        body: "Interviewers do not expect candidates to know everything. How you react to an unfamiliar problem can demonstrate communication skills, honesty, reasoning, and willingness to learn.",

        points: [
          "Stay calm.",
          "Do not invent an answer.",
          "Explain related concepts you do understand.",
          "Ask for clarification if the question is ambiguous.",
          "Describe how you would investigate the problem.",
        ],

        exampleTitle: "Sample Response",

        example:
          "I'm not completely sure about the exact answer, so I don't want to guess. My understanding is that it is related to database indexing. I know indexes can improve certain read operations, but they also introduce storage and write overhead. I would need to review the specific implementation before giving a complete answer.",

        mistake:
          "Avoid confidently giving information you know may be incorrect. A thoughtful partial answer is usually better than pretending.",
      },

      {
        heading: "14. What Salary Do You Expect?",

        body: "Salary discussions can be uncomfortable for freshers. Research typical compensation for the position, company type, location, and required skills before your interview. Consider the complete compensation package rather than focusing only on one number.",

        points: [
          "Research realistic salary ranges.",
          "Understand whether the company has a fixed fresher package.",
          "Avoid unrealistic expectations without supporting experience.",
          "Consider benefits, learning opportunities, location, and role quality.",
          "Remain professional during negotiation.",
        ],

        exampleTitle: "Sample Answer",

        example:
          "As a fresher, my main priority is finding a role where I can develop strong practical experience. Based on my research and the responsibilities of this position, I'm open to a competitive package within the company's normal range for entry-level candidates. I'm happy to understand the full compensation structure before discussing a specific figure.",

        mistake:
          "Do not say 'anything is fine' if compensation matters to you, and do not give an unusually high figure without understanding the role and market.",
      },

      {
        heading: "15. What Questions Should You Ask the Interviewer?",

        body: "When an interviewer asks whether you have questions, use the opportunity to understand the role, team, expectations, and learning environment. Thoughtful questions can also demonstrate genuine interest.",

        points: [
          "What would success look like during the first three months?",
          "What technologies does the team currently use?",
          "How are freshers mentored during onboarding?",
          "What type of projects would I initially work on?",
          "What are the biggest challenges the team is currently solving?",
          "What are the next steps in the interview process?",
        ],

        exampleTitle: "Good Closing Question",

        example:
          "Could you tell me what you would expect a successful new graduate joining this team to learn or accomplish during the first three to six months?",

        mistake:
          "Avoid saying 'I don't have any questions' every time. Also avoid asking only about holidays, promotions, or salary before understanding the role.",
      },
    ],
  },

  {
    id: "ats-friendly-resume-guide",
    slug: "ats-friendly-resume-guide",
    title: "How to Build an ATS-Friendly Software Developer Resume",
    category: "Resume Tips",
    readTime: "12 min read",
    date: "Sep 8, 2026",

    summary:
      "Learn how to create a clean software developer resume that is easy for recruiters and Applicant Tracking Systems to read, with practical formatting, keyword, project, skills, and bullet-point guidance.",

    tip: "Never copy keywords into your resume simply to pass an ATS. Only include technologies and skills that you genuinely understand and can confidently explain during an interview.",

    content: [
      {
        heading: "1. What Is an Applicant Tracking System?",

        body: "An Applicant Tracking System, commonly called an ATS, is software that organizations can use to collect, organize, search, and review job applications. Recruiters may use these systems to manage large numbers of applications and search resumes for relevant experience, skills, job titles, and other information.",

        points: [
          "ATS software can identify common resume headings.",
          "Recruiters may search applications using skills and job titles.",
          "Simple formatting reduces parsing problems.",
          "Relevant keywords help describe your real experience.",
          "Your resume still needs to be useful to a human recruiter.",
        ],
      },

      {
        heading: "2. Use a Simple Single-Column Layout",

        body: "Complex resume designs may look attractive, but they can make important information harder to scan. For most software roles, a clean single-column layout makes the reading order obvious and allows both recruiters and automated systems to quickly identify important information.",

        points: [
          "Use consistent margins.",
          "Choose a readable font.",
          "Use clear section spacing.",
          "Avoid unnecessary graphics and decorative elements.",
          "Keep important text as actual text rather than placing it inside images.",
        ],
      },

      {
        heading: "3. Use Standard Resume Section Names",

        body: "Creative headings can make your resume harder to understand. Familiar section names allow recruiters to quickly find the information they are looking for.",

        points: [
          "Professional Summary",
          "Technical Skills",
          "Experience",
          "Internships",
          "Projects",
          "Education",
          "Certifications",
        ],
      },

      {
        heading: "4. Tailor Your Resume to the Job Description",

        body: "Before applying, carefully read the job description and identify the technologies, responsibilities, qualifications, and experience most relevant to the role. Then make sure that your genuine matching experience is easy to find in your resume.",

        points: [
          "Highlight skills you actually have.",
          "Prioritize relevant technologies.",
          "Move relevant projects higher on the page.",
          "Use terminology that accurately matches your experience.",
          "Never use invisible keyword stuffing.",
        ],
      },

      {
        heading: "5. Write Strong Project Descriptions",

        body: "For freshers, projects can provide some of the strongest evidence of practical technical ability. Instead of only listing a project name and technology stack, explain what you built and what you personally contributed.",

        points: [
          "Explain the problem or purpose.",
          "Mention important technologies.",
          "Describe your personal contribution.",
          "Describe a challenge you solved.",
          "Include measurable results when genuinely available.",
        ],

        exampleTitle: "Weak vs Better",

        example: `Weak:
Job Portal - React, Supabase, Bootstrap

Better:
Built a responsive job discovery platform using React and Supabase. Implemented dynamic job listings, job detail pages, routing, database integration, and responsive UI components.`,

        mistake:
          "Avoid filling the projects section with technology names without explaining what you actually built.",
      },

      {
        heading: "6. Use Action-Oriented Bullet Points",

        body: "Resume bullets should explain what you actually did. Start with a strong action verb, describe the technical work, and include the result or purpose when possible.",

        points: [
          "Built a React dashboard for tracking job applications.",
          "Implemented REST API integration to retrieve job data.",
          "Optimized database queries to improve response time.",
          "Created reusable UI components to reduce duplicate code.",
          "Automated a repetitive workflow using Python.",
        ],
      },

      {
        heading: "7. Add Numbers Only When They Are Real",

        body: "Metrics can make achievements easier to understand, but invented statistics can damage credibility. Only include numbers that you measured or can reasonably explain during an interview.",

        points: [
          "Performance improvement percentages.",
          "Number of records processed.",
          "Number of users when accurately known.",
          "Time saved through automation.",
          "Number of features or modules delivered.",
        ],

        mistake:
          "Do not invent percentages such as 'improved performance by 80%' simply because quantified bullets look impressive.",
      },

      {
        heading: "8. Keep Your Skills Section Focused",

        body: "A long list of technologies does not automatically make a stronger resume. Recruiters may ask questions about anything you claim. Prioritize the languages, frameworks, databases, and tools you can genuinely use.",

        points: [
          "Languages: JavaScript, Java, Python.",
          "Frontend: React, HTML, CSS.",
          "Backend: Node.js, Express.",
          "Database: PostgreSQL, MySQL.",
          "Tools: Git, GitHub, VS Code.",
        ],

        mistake:
          "Avoid listing technologies you have only watched tutorials about but cannot use or explain.",
      },

      {
        heading: "9. Write a Useful Professional Summary",

        body: "A short professional summary can help recruiters understand what role you are targeting. For a fresher, two or three focused lines are generally more useful than a generic objective statement.",

        points: [
          "Mention your degree or current career stage.",
          "Mention your strongest technical area.",
          "Include relevant project or internship experience.",
          "Mention the role you are targeting.",
        ],

        exampleTitle: "Sample Summary",

        example:
          "Computer Science graduate focused on frontend and full-stack web development with hands-on experience building React applications, integrating REST APIs, and working with relational databases. Seeking an entry-level software developer role where I can contribute to production projects and continue developing my engineering skills.",
      },

      {
        heading: "10. Include Relevant Links",

        body: "For software roles, professional links can give recruiters additional evidence of your work. Make sure every link works and leads to something that supports your application.",

        points: [
          "LinkedIn profile.",
          "GitHub profile.",
          "Portfolio website.",
          "Live project demos when available.",
        ],

        mistake:
          "Do not include broken links, unfinished portfolios, or GitHub profiles filled only with copied tutorial repositories.",
      },

      {
        heading: "11. Proofread Before Applying",

        body: "Spelling mistakes, inconsistent dates, broken links, and incorrect contact information can create a poor first impression. Review the final resume carefully before every important application.",

        points: [
          "Check your phone number and email.",
          "Test LinkedIn and GitHub links.",
          "Verify dates.",
          "Check spelling and grammar.",
          "Check formatting consistency.",
          "Open the final PDF on desktop and mobile.",
          "Use a professional file name.",
        ],

        exampleTitle: "Professional File Name",

        example: "Karthick_Naren_Software_Developer_Resume.pdf",

        mistake:
          "Avoid file names such as final_resume_new_latest2.pdf or resume123.pdf.",
      },
    ],
  },

  {
    id: "off-campus-job-hunting-strategy",
    slug: "off-campus-job-hunting-strategy",
    title: "The Ultimate Off-Campus Placement Strategy for 2026 Graduates",
    category: "Career Strategy",
    readTime: "14 min read",
    date: "Sep 8, 2026",

    summary:
      "Build a practical off-campus job search system using targeted applications, job alerts, networking, referrals, portfolio projects, LinkedIn, GitHub, interview preparation, and consistent follow-up.",

    tip: "Measure your job search like a process. Track where you applied, the date, role, company, application source, status, referral contact, and follow-up date instead of relying on memory.",

    content: [
      {
        heading: "1. Choose Your Target Roles First",

        body: "Applying to every available job can make your preparation unfocused. Start by selecting one or two primary roles that match your strongest current skills and interests.",

        points: [
          "Choose roles based on your strongest skills.",
          "Study 20 to 30 relevant job descriptions.",
          "Identify commonly requested technologies.",
          "Identify common experience requirements.",
          "Use your findings to guide preparation.",
        ],

        exampleTitle: "Example",

        example:
          "If most frontend developer listings you study mention JavaScript, React, Git, REST APIs, HTML, and CSS, those technologies should become high-priority areas in your preparation and projects.",
      },

      {
        heading: "2. Build a Job-Ready Resume",

        body: "Your resume should make it immediately clear what type of role you are targeting. Highlight projects, internships, skills, education, and certifications that support that target.",

        points: [
          "Keep your strongest information near the top.",
          "Tailor your resume to the role.",
          "Write concise project descriptions.",
          "Use clear section headings.",
          "Link to GitHub or a portfolio where relevant.",
        ],
      },

      {
        heading: "3. Improve Your LinkedIn Profile",

        body: "A professional LinkedIn profile can help recruiters understand your background before contacting you. Your headline and About section should communicate your target role and relevant skills clearly.",

        points: [
          "Use a clear professional profile photo.",
          "Write a role-focused headline.",
          "Add projects and internships.",
          "Keep your skills relevant.",
          "Complete the About section.",
          "Add education and certifications accurately.",
        ],

        exampleTitle: "Example Headline",

        example:
          "2026 Computer Science Graduate | React & JavaScript Developer | Frontend Development | Open to Software Developer Opportunities",
      },

      {
        heading: "4. Create a Strong GitHub Portfolio",

        body: "For software roles, GitHub can provide evidence of how you structure and document projects. A few polished repositories are usually more useful than dozens of unfinished projects.",

        points: [
          "Pin your strongest repositories.",
          "Write useful README files.",
          "Explain project features.",
          "Add setup instructions.",
          "Include screenshots where useful.",
          "Keep repository names professional.",
        ],

        mistake:
          "Avoid presenting copied tutorial projects as if they were entirely your own work.",
      },

      {
        heading: "5. Build Projects That Demonstrate Skills",

        body: "Projects should demonstrate that you can use your technical knowledge to build something functional. Try to create projects that require multiple skills rather than very small isolated examples.",

        points: [
          "Solve a clear problem.",
          "Use relevant technologies.",
          "Include database or API integration when appropriate.",
          "Handle loading and error states.",
          "Make the interface responsive.",
          "Deploy the project when possible.",
        ],
      },

      {
        heading: "6. Set Up Targeted Job Alerts",

        body: "Job alerts reduce the need to manually search every job portal repeatedly. Create alerts that match your preferred job titles, technologies, experience level, and locations.",

        points: [
          "Use specific job titles.",
          "Create alerts for fresher and entry-level roles.",
          "Try multiple related job titles.",
          "Check alerts consistently.",
          "Avoid applying blindly to unrelated positions.",
        ],
      },

      {
        heading: "7. Apply Early, But Read the Job Description",

        body: "Recently posted opportunities can receive many applications, so checking new openings regularly can help. However, speed should not replace relevance.",

        points: [
          "Confirm required experience.",
          "Check location and work mode.",
          "Review mandatory skills.",
          "Check education requirements.",
          "Verify the company and application source.",
          "Check whether the listing is still active.",
        ],
      },

      {
        heading: "8. Ask for Referrals Professionally",

        body: "A referral request works best when it is specific, short, and respectful. Give the person enough information to quickly understand who you are and which opening you are interested in.",

        points: [
          "Introduce yourself briefly.",
          "Mention the exact job title.",
          "Include the requisition number when available.",
          "Explain why your profile is relevant.",
          "Share your resume or portfolio.",
          "Do not pressure the person.",
          "Thank them even if they cannot help.",
        ],

        exampleTitle: "Sample Referral Message",

        example:
          "Hi, I came across the Junior Software Developer opening at your company and noticed that my React, JavaScript, and SQL experience aligns with several of the requirements. I'm a 2026 Computer Science graduate and have attached my resume for context. If you feel my profile is suitable, I would really appreciate a referral. Thank you for your time.",
      },

      {
        heading: "9. Prepare for Interviews While You Apply",

        body: "Do not wait until you receive an interview invitation before starting preparation. A consistent routine will make interviews less stressful and reduce last-minute preparation.",

        points: [
          "Practice your self-introduction.",
          "Revise core technical concepts.",
          "Prepare project explanations.",
          "Practice coding or aptitude questions when relevant.",
          "Prepare common HR answers.",
          "Take mock interviews.",
        ],
      },

      {
        heading: "10. Track Every Application",

        body: "A simple spreadsheet can prevent duplicate applications and help you understand which job-search strategies are working. Tracking also makes follow-up much easier.",

        points: [
          "Company name.",
          "Job title.",
          "Application date.",
          "Application source.",
          "Current status.",
          "Referral contact.",
          "Follow-up date.",
          "Notes.",
        ],

        exampleTitle: "Useful Status Values",

        example:
          "Applied → Assessment → Interview Round 1 → Interview Round 2 → Offer / Rejected / Withdrawn",
      },

      {
        heading: "11. Follow Up Carefully",

        body: "A polite follow-up can be useful when you have completed an interview or when a recruiter has requested additional information. Avoid repeatedly messaging recruiters every day.",

        points: [
          "Keep the message brief.",
          "Mention the role.",
          "Mention the interview or application date.",
          "Thank the recruiter.",
          "Ask politely about the next step.",
        ],

        exampleTitle: "Sample Follow-Up",

        example:
          "Hello, thank you again for the opportunity to interview for the Software Developer position on Monday. I enjoyed learning more about the team and the role. I wanted to check whether there are any updates regarding the next stage of the process. Thank you for your time.",
      },

      {
        heading: "12. Review Your Results Every Two Weeks",

        body: "If you are applying consistently but receiving few responses, do not simply increase the number of applications. Review your process and identify where the problem may be occurring.",

        points: [
          "Low callbacks may indicate resume or targeting problems.",
          "Repeated assessment failures may indicate technical gaps.",
          "Interview failures may indicate preparation or communication gaps.",
          "Very few suitable openings may mean your search terms are too narrow.",
          "Use actual results to change your strategy.",
        ],
      },

      {
        heading: "13. Avoid Common Job Search Scams",

        body: "Job seekers should be cautious when dealing with unknown recruiters, suspicious websites, or offers that appear unrealistic. Verify important opportunities independently before sharing sensitive information.",

        points: [
          "Be cautious if someone guarantees a job in exchange for payment.",
          "Verify recruiter email domains.",
          "Check the company's official careers website.",
          "Avoid sending banking passwords or OTPs.",
          "Be cautious with suspicious offer letters.",
          "Do not install unknown software simply because a recruiter asks you to.",
        ],

        mistake:
          "A legitimate-looking logo or message is not proof that the recruiter actually represents the company.",
      },

      {
        heading: "14. Stay Consistent Without Applying Blindly",

        body: "Off-campus job hunting can take time. Consistency matters, but application quality matters as well. A smaller number of relevant, well-prepared applications can be more useful than sending the same resume to hundreds of unrelated roles.",

        points: [
          "Create a weekly application target.",
          "Set aside time for skill development.",
          "Continue improving projects.",
          "Review your results regularly.",
          "Adjust your resume when necessary.",
          "Keep preparing even while waiting for responses.",
        ],
      },
    ],
  },
];
