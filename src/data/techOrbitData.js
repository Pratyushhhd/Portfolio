// Verified technologies only — derived from the Skills section and shipped projects.
// `projects` references project ids from src/data/portfolioData.js.

export const technologies = [
    {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Frontend',
        icon: 'square-js',
        level: 85,
        description: 'ES6+, async patterns, and DOM APIs — the engine behind most of my projects.',
        projects: ['calculator', 'budget-tool', 'pomodoro'],
    },
    {
        id: 'react',
        name: 'React',
        category: 'Frontend',
        icon: 'react',
        level: 70,
        description: 'Hooks, state management, and component architecture for interactive interfaces.',
        projects: ['bachat', 'portfolio'],
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        category: 'Frontend',
        label: 'N',
        level: null,
        description: 'App routing and server-side session handling for full-stack applications.',
        projects: ['bachat'],
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        category: 'Frontend',
        label: '~',
        level: null,
        description: 'Utility-first styling used to build the Bachat dashboard.',
        projects: ['bachat'],
    },
    {
        id: 'htmlcss',
        name: 'HTML & CSS',
        category: 'Frontend',
        icon: 'html5',
        level: 92,
        description: 'Semantic markup and modern layouts with Flexbox, Grid, and animations.',
        projects: ['calculator', 'pomodoro'],
    },
    {
        id: 'bootstrap',
        name: 'Bootstrap',
        category: 'Frontend',
        icon: 'bootstrap',
        level: 88,
        description: 'Responsive layouts, components, and utility-first grids.',
        projects: [],
    },
    {
        id: 'gitgithub',
        name: 'Git & GitHub',
        category: 'Tools',
        icon: 'git',
        level: 80,
        description: 'Version control, branching workflows, and collaboration.',
        projects: ['calculator', 'budget-tool', 'pomodoro'],
    },
    {
        id: 'uiux',
        name: 'UI/UX Design',
        category: 'Tools',
        icon: 'palette',
        level: 75,
        description: 'Figma prototyping, color theory, and interaction design.',
        projects: ['portfolio'],
    },
];

export const categories = ['All', 'Frontend', 'Tools'];

export const RINGS = [
    { ids: ['react', 'javascript', 'nextjs', 'tailwind'], radius: 0.365, speed: 0.00020, dir: 1 },
    { ids: ['htmlcss', 'bootstrap', 'gitgithub', 'uiux'], radius: 0.49, speed: 0.00014, dir: -1 },
];
