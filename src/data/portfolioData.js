// Single source of truth for "Ask Pratyush AI".
// Contains ONLY verified information displayed on the portfolio.
// Do not add unverified experience, employers, certifications, or statistics.

export const personal = {
    name: 'Pratyush Maharjan',
    firstName: 'Pratyush',
    role: 'Frontend Developer',
    alsoKnownAs: 'UI enthusiast and full-stack project builder',
    location: 'Kathmandu, Nepal',
    education: '2nd-year BCA (Bachelor of Computer Applications) student',
    interests: ['futsal', 'guitar'],
    portfolio: 'https://www.maharjanpratyush.com.np/',
};

export const skills = [
    { name: 'HTML & CSS', level: 92, detail: 'Semantic markup, Flexbox, Grid, Animations' },
    { name: 'JavaScript', level: 85, detail: 'ES6+, DOM, Async, APIs' },
    { name: 'Bootstrap', level: 88, detail: 'Responsive layouts, Components, Utility classes' },
    { name: 'React', level: 70, detail: 'Hooks, State, Components, JSX' },
    { name: 'Git & GitHub', level: 80, detail: 'Version control, Collaboration, Workflows' },
    { name: 'UI/UX Design', level: 75, detail: 'Figma, Color theory, Prototyping' },
    { name: 'Next.js', level: null, detail: 'Used to build Bachat, his full-stack finance dashboard' },
    { name: 'Tailwind CSS', level: null, detail: 'Used to style Bachat' },
];

export const projects = [
    {
        id: 'bachat',
        name: 'Bachat',
        description:
            'A full-stack personal finance dashboard where users track income and expenses, build budgets, set savings goals, and understand where their money goes.',
        technologies: ['Next.js', 'React', 'Tailwind CSS'],
        features: [
            'Secure authentication with encrypted sessions',
            'Income & expense tracking',
            'Budget building',
            'Savings goals',
            'Spending insights dashboard',
        ],
        challenges: 'Designing a multi-page authenticated app rather than a single static page.',
        solution: 'Built with Next.js app routing and server-side session handling, styled with Tailwind CSS.',
        liveUrl: 'https://bachat-xi.vercel.app/',
        githubUrl: null,
    },
    {
        id: 'calculator',
        name: 'Calculator App',
        description: 'Responsive calculator with a clean UI supporting basic arithmetic operations with keyboard input.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        features: ['Basic arithmetic operations', 'Keyboard input support', 'Fully responsive design'],
        challenges: 'Handling continuous calculations and edge cases like divide-by-zero cleanly.',
        solution: 'Central calculation logic in vanilla JavaScript with event-driven UI updates.',
        liveUrl: 'https://pratyushhhd.github.io/Calculator/',
        githubUrl: 'https://github.com/Pratyushhhd/Calculator',
    },
    {
        id: 'budget-tool',
        name: 'Budget Management Tool',
        description: 'Expense and income tracker with category filtering, interactive charts, and real-time balance updates.',
        technologies: ['JavaScript', 'Charts', 'LocalStorage'],
        features: [
            'Income & expense entries',
            'Category filtering',
            'Interactive charts',
            'Real-time balance updates',
            'Persistent storage without a backend via LocalStorage',
        ],
        challenges: 'Keeping data persistent without any server infrastructure.',
        solution: 'Stored transaction state in LocalStorage and derived chart data reactively.',
        liveUrl: 'https://pratyushhhd.github.io/Budget_Management_Tool/',
        githubUrl: 'https://github.com/Pratyushhhd/Budget_Management_Tool',
    },
    {
        id: 'pomodoro',
        name: 'Pomodoro Timer',
        description: 'Focus timer with customizable work/break intervals, session tracking, and a clean minimal interface.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        features: ['Customizable work/break intervals', 'Session tracking', 'Minimal distraction-free interface'],
        challenges: 'Keeping the timer accurate across background tabs.',
        solution: 'Time calculations anchored to timestamps instead of naive interval counting.',
        liveUrl: 'https://pratyushhhd.github.io/Pomodoro/',
        githubUrl: 'https://github.com/Pratyushhhd/Pomodoro',
    },
    {
        id: 'portfolio',
        name: 'Portfolio Website',
        description: 'This website — a React-powered portfolio with scroll animations, dark/light theme, and an integrated AI assistant.',
        technologies: ['React', 'Vite', 'CSS'],
        features: [
            'Dark/light theme with system preference detection',
            'Scroll-triggered animations',
            'Typing effect hero section',
            'This built-in AI portfolio assistant',
        ],
        challenges: 'Delivering rich interactions while keeping the site fast on static hosting.',
        solution: 'Built with React + Vite, inline SVG icons, no heavy UI frameworks, and lazy-loaded AI chat.',
        liveUrl: 'https://www.maharjanpratyush.com.np/',
        githubUrl: 'https://github.com/Pratyushhhd',
    },
];

export const contact = {
    email: 'pratyushmaharjan90@gmail.com',
    phone: '+977 9761610524',
    location: 'Kathmandu, Nepal',
    github: 'https://github.com/Pratyushhhd',
    linkedin: 'https://www.linkedin.com/in/pratyush-maharjan-1205a533b',
};

export const sections = {
    home: '#home',
    about: '#about',
    skills: '#skills',
    projects: '#projects',
    contact: '#contact',
};
