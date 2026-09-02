import { Briefcase, Globe, LucideIcon, MapPin, Sparkles } from 'lucide-react';
import { IJobs, IProjects, TagIcon } from '@/types';

type SectionOptions = 'home' | 'about' | 'experience' | 'projects' | 'techStack' | 'contact';

export const sectionsConfig: Record<SectionOptions, { id: string }> = {
  home: {
    id: 'home',
  },
  about: {
    id: 'about',
  },
  experience: {
    id: 'experience',
  },
  projects: {
    id: 'projects',
  },
  techStack: {
    id: 'techStack',
  },
  contact: {
    id: 'contact',
  },
};

export const contactEmail = 'josearpaiaquintero@gmail.com';

export const heroCopy = {
  kicker: 'Full Stack Developer',
  name: 'Jose Arpaia Quintero',
  subtitleLead: 'I build fast, accessible web and mobile apps with',
  subtitleHighlights: ['React', 'Next.js', 'TypeScript'],
  heroTech: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Go'],
};

interface AboutParagraph {
  lead: string;
  link?: { text: string; url: string };
  tail?: string;
}

export const aboutCopy: { paragraphs: AboutParagraph[] } = {
  paragraphs: [
    {
      lead: "I'm a full stack developer based in Panamá with over four years of experience building web and mobile applications. I currently work at",
      link: { text: 'BlueCore', url: 'https://www.bluecorela.com/' },
      tail: ', crafting mobile banking apps for the financial sector with Ionic and Angular, before that I spent three years at Etyalab shipping web products with Vue, React and Next.js.',
    },
    {
      lead: "I work across the stack with TypeScript, Node.js and PostgreSQL, and lately I've been building AI-powered side projects like a gym routine manager with vision-based equipment recognition and a voice-first app for practicing spoken English. As a full stack developer, I enjoy working with a wide range of tools and technologies, and I'm always looking for ways to improve my skills and knowledge. Being able to work with projects that actually change people's lives is a dream come true to me.",
    },
    {
      lead: "Outside of code: I enjoy sports, pop culture movies, tv shows, and video games. I'm a big fan of football, enjoy watching italian Serie A matches and playing FIFA (or A.K.A nowadays as EA Sports FC lol) with friends. Also, I like reading books, or listening to audiobooks lately.",
    },
  ],
};

export const aboutFacts: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: MapPin, label: 'Location', value: 'Panamá' },
  { icon: Briefcase, label: 'Experience', value: '5+ years · currently @ BlueCore' },
  { icon: Sparkles, label: 'Focus', value: 'Web & mobile products' },
  { icon: Globe, label: 'Languages', value: 'Spanish · English' },
];

export enum mediaLinks {
  github = 'https://github.com/josearpaiaq',
  linkedin = 'https://www.linkedin.com/in/josearpaia/',
}

export enum tagsEnum {
  react = 'React',
  tailwind = 'Tailwind CSS',
  typescript = 'TypeScript',
  nextjs = 'Next.js',
  vuejs = 'Vue.js',
  JavaScript = 'JavaScript',
  bash = 'Bash',
  git = 'Git',
  github = 'GitHub',
  mysql = 'MySQL',
  postgresql = 'PostgreSQL',
  nodejs = 'Node.js',
  figma = 'Figma',
  prettier = 'Prettier',
  vitejs = 'Vite.js',
  postman = 'Postman',
  ionic = 'Ionic',
  angular = 'Angular',
  golang = 'Golang',
  claudecode = 'Claude Code',
  nest = 'Nest JS',
}

export const tags: Record<
  tagsEnum,
  { title: string; url: string; icon?: TagIcon; color?: string }
> = {
  [tagsEnum.react]: {
    title: 'React',
    url: 'https://reactjs.org/',
    icon: '/icons/react-icon.svg',
  },
  [tagsEnum.tailwind]: {
    title: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
    icon: '/icons/tailwindcss-icon.svg',
  },
  [tagsEnum.typescript]: {
    title: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
    icon: '/icons/typescript-icon.svg',
  },
  [tagsEnum.nextjs]: {
    title: 'Next.js',
    url: 'https://nextjs.org/',
    icon: { dark: '/icons/nextjs_icon_dark.svg', light: '/icons/next-js-icon.svg' },
  },
  [tagsEnum.vuejs]: {
    title: 'Vue.js',
    url: 'https://vuejs.org/',
    icon: '/icons/vue-icon.svg',
  },
  [tagsEnum.JavaScript]: {
    title: 'JavaScript',
    url: 'https://www.javascript.com/',
    icon: '/icons/js-icon.svg',
  },
  [tagsEnum.bash]: {
    title: 'Bash',
    url: 'https://www.gnu.org/software/bash/',
    icon: '/icons/bash.svg',
  },
  [tagsEnum.git]: {
    title: 'Git',
    url: 'https://git-scm.com/',
    icon: '/icons/git.svg',
  },
  [tagsEnum.mysql]: {
    title: 'MySQL',
    url: 'https://www.mysql.com/',
    icon: '/icons/mysql.svg',
  },
  [tagsEnum.postgresql]: {
    title: 'PostgreSQL',
    url: 'https://www.postgresql.org/',
    icon: '/icons/postgresql.svg',
  },
  [tagsEnum.nodejs]: {
    title: 'Node.js',
    url: 'https://nodejs.org/',
    icon: '/icons/nodejs.svg',
  },
  [tagsEnum.figma]: {
    title: 'Figma',
    url: 'https://www.figma.com/',
    icon: '/icons/figma.svg',
  },
  [tagsEnum.prettier]: {
    title: 'Prettier',
    url: 'https://prettier.io/',
    icon: '/icons/prettier-icon-dark.svg',
  },
  [tagsEnum.vitejs]: {
    title: 'Vite.js',
    url: 'https://vitejs.dev/',
    icon: '/icons/vitejs.svg',
  },
  [tagsEnum.postman]: {
    title: 'Postman',
    url: 'https://www.postman.com/',
    icon: '/icons/postman.svg',
  },
  [tagsEnum.ionic]: {
    title: 'Ionic',
    url: 'https://ionicframework.com/',
    icon: '/icons/ionic-logo.webp',
  },
  [tagsEnum.angular]: {
    title: 'Angular',
    url: 'https://angular.io/',
    icon: '/icons/angular.svg',
  },
  [tagsEnum.golang]: {
    title: 'Golang',
    url: 'https://golang.org/',
    icon: { light: '/icons/Go_light.svg', dark: '/icons/Go_dark.svg' },
  },
  [tagsEnum.claudecode]: {
    title: 'Claude Code',
    url: 'https://claude.com/',
    icon: '/icons/claude-ai-icon.svg',
  },
  [tagsEnum.github]: {
    title: 'GitHub',
    url: 'https://github.com/',
    icon: '/icons/github.svg',
  },
  [tagsEnum.nest]: {
    title: 'Nest JS',
    url: 'https://nestjs.com/',
    icon: '/icons/nestjs.svg',
  },
};

export const projects: IProjects[] = [
  {
    slug: 'property-historical-app',
    title: 'Property Historical App',
    description:
      'Full-stack app for tracking property maintenance history: repairs, improvements, and changes, with file attachments and recurring reminders. Backend built with NestJS + Drizzle ORM + PostgreSQL, frontend with React + Vite + TailwindCSS/shadcn, JWT auth, and S3 file storage. Deployed on Railway (API), Vercel (frontend), and Neon (DB).',
    status: 'Live',
    featured: true,
    url: 'https://property-historical.vercel.app/login',
    image: '/projects/property-historical-dashboard.png',
    repo: 'https://github.com/josearpaiaq/property-historical',
    tags: [tagsEnum.react, tagsEnum.postgresql, tagsEnum.git, tagsEnum.nest],
    order: 1,
  },
  {
    slug: 'quiniela-fifa-world-cup-2026',
    title: 'Quiniela Fifa World Cup 2026',
    description:
      'This project is a full-stack web app for playing and guessing the results of the 2026 FIFA World Cup. It is built with Next.js, PostgreSQL, TypeScript, Tailwind CSS, and Node.js. The app uses a Neon.com postgresql database for storing the results of the matches and the user’s guesses. The app also uses vercel for hosting and deployment. The project is open-source and available on GitHub.',
    status: 'Live',
    featured: true,
    url: 'https://quiniela-wc-2026-lovat.vercel.app',
    image: '/projects/quiniela-world-cup-2026.png',
    repo: 'https://github.com/josearpaiaq/quiniela-wc-2026',
    tags: [
      tagsEnum.nodejs,
      tagsEnum.postgresql,
      tagsEnum.typescript,
      tagsEnum.tailwind,
      tagsEnum.nextjs,
    ],
    order: 4,
  },
  {
    slug: 'gym-routine-manager',
    title: 'Gym Routine Manager',
    description:
      'This is a full-stack web app for building and managing personalized gym routines, powered by AI. Users create weekly routines organized by muscle groups, then use the built-in AI analyzer to identify gym machines from a photo — Claude Vision recognizes the equipment, lists the muscles it targets, and generates step-by-step exercises. Analyzed machines are automatically surfaced inside the relevant routine days based on muscle group matching.',
    status: 'Live',
    featured: true,
    url: 'https://www.gym-manager.lat/',
    image: '/projects/gym-routine-manager.png',
    repo: 'https://github.com/josearpaiaq/gym-routine-manager',
    tags: [
      tagsEnum.nodejs,
      tagsEnum.postgresql,
      tagsEnum.typescript,
      tagsEnum.tailwind,
      tagsEnum.nextjs,
    ],
    order: 2,
  },
  {
    slug: 'chatterly',
    title: 'Chatterly',
    description:
      'Chatterly is a voice-first web app that helps users practice spoken English through real-time AI conversations. Users speak directly into the browser — their audio is transcribed via Groq Whisper, processed by a LLaMA 3.3 70B model, and replied to using Azure Neural Text-to-Speech — creating a natural, immersive dialogue loop.',
    status: 'Live',
    featured: true,
    url: 'https://chatterly-app.vercel.app/',
    image: '/projects/chatterly-app.png',
    repo: 'https://github.com/josearpaiaq/chatterly-app',
    tags: [tagsEnum.claudecode, tagsEnum.typescript, tagsEnum.nextjs],
    order: 2,
  },
  {
    slug: 'url-shortener',
    title: 'URL Shortener',
    description:
      'A production-ready URL shortening service built with Go, featuring a REST API, PostgreSQL persistence, and a server-rendered frontend. Implements FNV-32a hashing for short code generation, per-request logging middleware, and click tracking per shortened URL. Containerized with Docker Compose for one-command local setup.',
    status: 'Live',
    featured: true,
    url: 'https://shortener-pk9s.onrender.com/',
    image: '/projects/url-shortener.png',
    repo: 'https://github.com/josearpaiaq/shortener',
    tags: [tagsEnum.golang],
    order: 2,
  },
  {
    slug: 'funny-math-app',
    title: 'Funny Math App',
    description:
      'This a calculator app that can calculate basic math operations like addition, subtraction, multiplication, and division. Made with React 18 when it just came out. I tried to make an unique style for the buttons and the inputs, not a complex project but gets tricky on the right control of the operations and context maintaining.',
    status: 'Live',
    url: 'https://funny-math.netlify.app/',
    image: '/projects/funny-math-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.react],
  },
  {
    slug: 'tic-tac-toe-game',
    title: 'Tic Tac Toe game',
    description:
      'Tic Tac Toe is a classic game that can be played with two players. It is a simple game that is easy to learn and play. I made this game using vainilla JavaScript, HTML and CSS. I host the game using the GitHub Pages service that makes it super easy to settle a continuous integration pipeline with every merge to master branch, it is available online now.',
    status: 'Live',
    url: 'https://josearpaiaq.github.io/Tic-Tac-Toe/',
    image: '/projects/tic-tac-toe-game.png',
    tags: [tagsEnum.JavaScript],
  },
  {
    slug: 'vue-todo-app',
    title: 'To-do App made with Vue.js',
    description:
      'A simple to-do app made with Vue.js I made with vue cli, bootstrap and data persistence with local storage. You can create new tasks, edit a task, mark a task as completed, put back to uncompleted or delete a task, only using the local storage to store the tasks go we do not need to use a database.',
    status: 'Live',
    url: 'https://to-do-app-jaq.netlify.app/',
    image: '/projects/vue-todo-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.vuejs],
  },
  {
    slug: 'rick-and-morty-wiki',
    title: 'Rick and Morty Wiki',
    description:
      'I developed a Rick and Morty character Wiki using the official API to fetch detailed character information. The app also features pagination by leveraging the API’s built-in properties. This project was a great way to sharpen my vanilla JavaScript skills, and it was built entirely with HTML, CSS, and JavaScript.',
    status: 'Live',
    url: 'https://rick-and-morty-wiki-by-josearpaiaq.netlify.app/',
    image: '/projects/rick-and-morty-wiki.png',
    tags: [tagsEnum.JavaScript],
  },
  {
    slug: 'country-finder-app',
    title: 'Country Finder App',
    description:
      'This application allows you to find countries by their name or by its continent. Made with vue and bootstrap. Develop this application was really fun and helped me learn more about vue, vue lifecycle, components, conditional rendering and other stuff i was really new about at the time.',
    status: 'Live',
    url: 'https://allaroundtheworld.netlify.app/',
    image: '/projects/countries-finder-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.vuejs],
  },
];

export const jobs: IJobs[] = [
  {
    company: 'BlueCore, S.A.',
    startDate: 'Nov, 2024',
    endDate: 'Present',
    position: 'Software Engineer',
    description:
      'I build and ship mobile applications for the financial sector, owning the UI layer and feature delivery end to end — from implementation to a polished, seamless user experience.',
    url: 'https://www.bluecorela.com/',
    remarkablePoints: [
      'Develop and maintain mobile banking apps with Ionic + Angular for financial-sector clients.',
      'Own the user interface layer: new features, UX consistency and performance.',
      'Work day to day with a close-knit, supportive engineering team.',
    ],
    tags: [tagsEnum.ionic, tagsEnum.angular, tagsEnum.tailwind, tagsEnum.typescript],
  },
  {
    company: 'Etyalab S.A.',
    startDate: 'Nov, 2021',
    endDate: 'Nov, 2024',
    position: 'Frontend Developer',
    description:
      'For three years I developed and maintained the company’s web applications — building user interfaces, shipping new features and keeping the product experience consistent across releases.',
    remarkablePoints: [
      'Built and maintained production user interfaces with Vue, React, Next.js and TypeScript.',
      'Shipped continuous visual and functional improvements across the product suite.',
      'Owned user experience quality from design handoff to release.',
    ],
    tags: [tagsEnum.vuejs, tagsEnum.react, tagsEnum.tailwind, tagsEnum.typescript, tagsEnum.nextjs],
    url: 'https://etyalab.com',
  },
];
