// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "Projects",
          description: "This page showcases projects I’ve created, including those that have been committed and deployed on GitHub. Each project comes with a brief explanation and, where applicable, a link to the corresponding repository. Some projects are not yet committed or publicly deployed due to ongoing revisions, data privacy considerations, or other constraints. The page is actively being updated to reflect my current progress.  All processes on this webpage are developed and managed using PyCharm and GitHub. For the best experience, I recommend exploring these projects on a laptop or desktop computer.  I’m always working to improve and expand my projects. If you have any suggestions, corrections, or ideas, feel free to send me an email — I’d truly value your input and would love to connect!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-announcement-1",
          title: 'Announcement_1',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_1/";
            },},{id: "news-announcement-2",
          title: 'Announcement_2',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-announcement-3",
          title: 'Announcement_3',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_project/";
            },},{id: "projects-patterns-in-transportation-income-and-poverty-across-all-50-u-s-states",
          title: 'Patterns in Transportation, Income, and Poverty Across All 50 U.S. States',
          description: "Platform - Tableau",
          section: "Projects",handler: () => {
              window.location.href = "/projects/11_project/";
            },},{id: "projects-comparative-machine-learning-approaches-for-predicting-scale-score-averages-capstone",
          title: 'Comparative Machine Learning Approaches For Predicting Scale Score Averages (Capstone)',
          description: "Language - Python, Environment - Jupyter Lab",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-patterns-in-transportation-income-and-poverty-across-all-50-u-s-states",
          title: 'Patterns in Transportation, Income, and Poverty Across All 50 U.S. States',
          description: "Language - Python, Environment - Jupyter Lab, Visualization Platform - Tableau",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-simple-weather-prediction-using-python-and-sqlite",
          title: 'Simple Weather Prediction Using Python and SQLite',
          description: "Language - Python, Database - SQLite, Environment - PyCharm",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-guide-to-downloading-quality-data-and-sources-for-reliable-datasets",
          title: 'Guide to Downloading Quality Data and Sources for Reliable Datasets',
          description: "Data Sources",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
