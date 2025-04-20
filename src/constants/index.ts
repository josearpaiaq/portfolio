import { IExperience, IJobs, IProjects } from '@/types';

type SectionOptions = 'home' | 'experience' | 'projects' | 'techStack' | 'contact';
type SectionStyles = {
  background?: string;
};

export const sectionsConfig: Record<SectionOptions, { id: string; styles?: SectionStyles }> = {
  home: {
    id: 'home',
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
  mysql = 'MySQL',
  postgresql = 'PostgreSQL',
  nodejs = 'Node.js',
  figma = 'Figma',
  prettier = 'Prettier',
  vitejs = 'Vite.js',
  postman = 'Postman',
  ionic = 'Ionic',
  angular = 'Angular',
  // canva = 'Canva',
  // github = 'GitHub',
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
  };

export const experiences: IExperience[] = [
  {
    title: 'Frontend Engineer',
    description: 'Experienced in JavaScript, React, and Vue.',
    fullTime: true,
    remote: true,
    location: 'Panama City, Panama',
    startDate: 2021,
    endDate: 'present',
    company: 'Etyalab S.A.',
    url: 'https://etyalab.com',
    image: '/images/experiences/jose-arpaia.png',
    tags: [tagsEnum.react, tagsEnum.tailwind, tagsEnum.typescript, tagsEnum.vuejs],
  },
];

export const projects: IProjects[] = [
  {
    title: 'Funny Math App',
    description:
      'This a calculator app that can calculate basic math operations like addition, subtraction, multiplication, and division. Made with React 18 when it just came out. I tried to make an unique style for the buttons and the inputs, not a complex project but gets tricky on the right control of the operations and context maintaining.',
    url: 'https://funny-math.netlify.app/',
    image: 'projects/funny-math-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.react],
  },
  {
    title: 'Tic Tac Toe game',
    description:
      'Tic Tac Toe is a classic game that can be played with two players. It is a simple game that is easy to learn and play. I made this game using vainilla JavaScript, HTML and CSS. I host the game using the GitHub Pages service that makes it super easy to settle a continuous integration pipeline with every merge to master branch, it is available online now.',
    url: 'https://josearpaiaq.github.io/Tic-Tac-Toe/',
    image: 'projects/tic-tac-toe-game.png',
    tags: [tagsEnum.JavaScript],
  },
  {
    title: 'To-do App made with Vue.js',
    description:
      'A simple to-do app made with Vue.js I made with vue cli, bootstrap and data persistence with local storage. You can create new tasks, edit a task, mark a task as completed, put back to uncompleted or delete a task, only using the local storage to store the tasks go we do not need to use a database.',
    url: 'https://to-do-app-jaq.netlify.app/',
    image: 'projects/vue-todo-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.vuejs],
  },
  {
    title: 'Rick and Morty Wiki',
    description:
      'I developed a Rick and Morty character Wiki using the official API to fetch detailed character information. The app also features pagination by leveraging the API’s built-in properties. This project was a great way to sharpen my vanilla JavaScript skills, and it was built entirely with HTML, CSS, and JavaScript.',
    url: 'https://rick-and-morty-wiki-by-josearpaiaq.netlify.app/',
    image: 'projects/rick-and-morty-wiki.png',
    tags: [tagsEnum.JavaScript],
  },
  {
    title: 'Country Finder App',
    description:
      'This application allows you to find countries by their name or by its continent. Made with vue and bootstrap. Develop this application was really fun and helped me learn more about vue, vue lifecycle, components, conditional rendering and other stuff i was really new about at the time.',
    url: 'https://allaroundtheworld.netlify.app/',
    image: 'projects/countries-finder-app.png',
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
      "Here, in this company, I develop and maintain the mobile applications for the clients' company. Specially, for the financial sector, I develop the mobile applications that help the bank to manage their clients and their money. I am responsible for creating and maintaining the user interface, ensuring a seamless user experience, and implementing new features and functionalities.",
    url: 'https://www.bluecorela.com/',
    remarkablePoints: [
      'Working with the Ionic framework to develop mobile applications.',
      'Fisrt experiences with the Angular framework that combine with Ionic perfectly.',
      'The Bluecore team is a very friendly and supportive team.',
    ],
    tags: [
      tagsEnum.ionic,
      tagsEnum.angular,
      tagsEnum.JavaScript,
      tagsEnum.tailwind,
      tagsEnum.typescript,
    ],
  },
  {
    company: 'Etyalab S.A.',
    startDate: 'Nov, 2021',
    endDate: 'Nov, 2024',
    position: 'Frontend Developer',
    description:
      'My role in the company is to develop and maintain the web applications. I am responsible for creating and maintaining the user interface, ensuring a seamless user experience, and implementing new features and functionalities.',
    remarkablePoints: [
      'Developed and maintained the user interfaces.',
      'Implemented new features and functionalities for visual and functional improvements.',
      'Ensured a seamless user experience.',
    ],
    tags: [
      tagsEnum.JavaScript,
      tagsEnum.vuejs,
      tagsEnum.react,
      tagsEnum.tailwind,
      tagsEnum.typescript,
      tagsEnum.nextjs,
    ],
    url: 'https://etyalab.com',
  },
];
