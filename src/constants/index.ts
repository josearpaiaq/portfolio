import { IJobs, IProjects } from '@/types';

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
}

export const tags: Record<tagsEnum, { title: string; url: string; icon?: string; color?: string }> =
  {
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
      icon: '/icons/next-js-icon.svg',
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
      icon: '/icons/Go_dark.svg',
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
  };

export const projects: IProjects[] = [
  {
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
  },
  {
    title: 'Chatterly',
    description:
      'Chatterly is a voice-first web app that helps users practice spoken English through real-time AI conversations. Users speak directly into the browser — their audio is transcribed via Groq Whisper, processed by a LLaMA 3.3 70B model, and replied to using Azure Neural Text-to-Speech — creating a natural, immersive dialogue loop.',
    status: 'Live',
    featured: true,
    url: 'https://chatterly-app.vercel.app/',
    image: '/projects/chatterly-app.png',
    repo: 'https://github.com/josearpaiaq/chatterly-app',
    tags: [tagsEnum.claudecode, tagsEnum.typescript, tagsEnum.nextjs],
  },
  {
    title: 'URL Shortener',
    description:
      'A production-ready URL shortening service built with Go, featuring a REST API, PostgreSQL persistence, and a server-rendered frontend. Implements FNV-32a hashing for short code generation, per-request logging middleware, and click tracking per shortened URL. Containerized with Docker Compose for one-command local setup.',
    status: 'Live',
    featured: true,
    url: 'https://shortener-pk9s.onrender.com/',
    image: '/projects/url-shortener.png',
    repo: 'https://github.com/josearpaiaq/shortener',
    tags: [tagsEnum.golang],
  },
  {
    title: 'Funny Math App',
    description:
      'This a calculator app that can calculate basic math operations like addition, subtraction, multiplication, and division. Made with React 18 when it just came out. I tried to make an unique style for the buttons and the inputs, not a complex project but gets tricky on the right control of the operations and context maintaining.',
    status: 'Live',
    url: 'https://funny-math.netlify.app/',
    image: '/projects/funny-math-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.react],
  },
  {
    title: 'Tic Tac Toe game',
    description:
      'Tic Tac Toe is a classic game that can be played with two players. It is a simple game that is easy to learn and play. I made this game using vainilla JavaScript, HTML and CSS. I host the game using the GitHub Pages service that makes it super easy to settle a continuous integration pipeline with every merge to master branch, it is available online now.',
    status: 'Live',
    url: 'https://josearpaiaq.github.io/Tic-Tac-Toe/',
    image: '/projects/tic-tac-toe-game.png',
    tags: [tagsEnum.JavaScript],
  },
  {
    title: 'To-do App made with Vue.js',
    description:
      'A simple to-do app made with Vue.js I made with vue cli, bootstrap and data persistence with local storage. You can create new tasks, edit a task, mark a task as completed, put back to uncompleted or delete a task, only using the local storage to store the tasks go we do not need to use a database.',
    status: 'Live',
    url: 'https://to-do-app-jaq.netlify.app/',
    image: '/projects/vue-todo-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.vuejs],
  },
  {
    title: 'Rick and Morty Wiki',
    description:
      'I developed a Rick and Morty character Wiki using the official API to fetch detailed character information. The app also features pagination by leveraging the API’s built-in properties. This project was a great way to sharpen my vanilla JavaScript skills, and it was built entirely with HTML, CSS, and JavaScript.',
    status: 'Live',
    url: 'https://rick-and-morty-wiki-by-josearpaiaq.netlify.app/',
    image: '/projects/rick-and-morty-wiki.png',
    tags: [tagsEnum.JavaScript],
  },
  {
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
