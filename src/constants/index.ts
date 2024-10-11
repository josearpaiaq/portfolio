import { IExperience, IJobs, IProjects } from '@/types';

type SectionOptions = 'home' | 'experience' | 'projects' | 'contact';
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
    title: 'Rick and Morty Wiki',
    description:
      'This a Wiki for Rick and Morty characters. Take advantage of the rick and morty api (https://rickandmortyapi.com/) to fetch the characters and its insights, the app is paginated too using the api pagination properties. Believe this project was really helpful to me to practice javascript vainilla skills. Made with only HTML, CSS, and JavaScript.',
    url: 'https://rick-and-morty-wiki-by-josearpaiaq.netlify.app/',
    image: 'projects/rick-and-morty-wiki.png',
    tags: [tagsEnum.JavaScript],
  },
  {
    title: 'To-do App made with Vue.js',
    description:
      'A simple to-do app made with Vue.js i made with vue cli, bootstrap and data persistence with local storage. You can create new tasks, edit a task, mark a task as completed, put back to uncompleted or delete a task, only using the local storage to store the tasks go we do not need to use a database.',
    url: 'https://to-do-app-jaq.netlify.app/',
    image: 'projects/vue-todo-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.vuejs],
  },
  {
    title: 'Funny Math App',
    description:
      'This a calculator app that can calculate basic math operations like addition, subtraction, multiplication, and division. Made with React 18 when it just came out. I tried to make an unique style for the buttons and the inputs, not a complex project but gets tricky on the right control of the operations and context maintaining.',
    url: 'https://funny-math.netlify.app/',
    image: 'projects/funny-math-app.png',
    tags: [tagsEnum.JavaScript, tagsEnum.react],
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
    company: 'Etyalab S.A.',
    date: 'Nov 01, 2021 - Today',
    position: 'Frontend Developer',
    description:
      'My role in the company is to develop and maintain the web applications. I am responsible for creating and maintaining the user interface, ensuring a seamless user experience, and implementing new features and functionalities.',
    remarkablePoints: [
      'Developed and maintained the user interface, ensuring a seamless user experience.',
      'Implemented new features and functionalities.',
      'Responsible for creating and maintaining the user interface.',
      'Ensured a seamless user experience.',
    ],
  },
];
