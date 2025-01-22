export const upcomingTasks = [
  {
    itemId: 2230,
    taskName: 'Learn JavaScript Basics',
    taskDescription:
      'Understand the basics of JavaScript, including variables, loops, and functions.',
    dueDate: '2025-01-20T00:00:00',
    createdOn: '2025-01-12T18:30:00.000',
    isCompleted: false,
    tags: 'JavaScript, Basics, Programming',
    completedOn: null,
  },
  {
    itemId: 2231,
    taskName: 'CSS Grid Practice',
    taskDescription:
      'Create a responsive layout using CSS Grid with auto-fit and minmax properties.',
    dueDate: '2025-01-22T00:00:00',
    createdOn: '2025-01-13T10:10:00.000',
    isCompleted: false,
    tags: 'CSS, Grid, Responsive',
    completedOn: null,
  },
];

export const completedTasks = [
  {
    itemId: 2232,
    taskName: 'React State Management',
    taskDescription:
      'Explore useState and useReducer hooks in React to manage component state effectively.',
    dueDate: '2025-01-18T00:00:00',
    createdOn: '2025-01-13T12:00:00.000',
    isCompleted: true,
    tags: 'React, Hooks, State',
    completedOn: '2025-01-14T15:30:00.000',
  },
  {
    itemId: 2233,
    taskName: 'Angular Directives Deep Dive',
    taskDescription:
      'Learn how to create and use custom directives in Angular for better DOM manipulation.',
    dueDate: '2025-01-16T00:00:00',
    createdOn: '2025-01-10T10:15:00.000',
    isCompleted: true,
    tags: 'Angular, Directives, DOM',
    completedOn: '2025-01-15T14:00:00.000',
  },
];

export const overdueTasks = [
  {
    itemId: 2234,
    taskName: 'Node.js Backend Setup',
    taskDescription:
      'Set up a basic Node.js backend with Express.js to handle API requests.',
    dueDate: '2025-01-18T00:00:00',
    createdOn: '2025-01-08T09:00:00.000',
    isCompleted: false,
    tags: 'Node.js, Backend, API',
    completedOn: null,
  },
  {
    itemId: 2235,
    taskName: 'Git and GitHub Workflow',
    taskDescription:
      'Understand the basic Git commands and how to collaborate using GitHub.',
    dueDate: '2025-01-19T00:00:00',
    createdOn: '2025-01-12T11:20:00.000',
    isCompleted: false,
    tags: 'Git, GitHub, Version Control',
    completedOn: null,
  },
];

export const allTasks = [...upcomingTasks, ...completedTasks, ...overdueTasks];
