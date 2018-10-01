//@flow
import type {
  ResumeData
} from "./typings"

const db: ResumeData = {
  header: {
    name: "Peter Ward",
    address: "175 Eastern Parkway, Brooklyn, NY 11238",
    mobile: "+1 775 223 4210",
    email: "peterhward@outlook.com",
  },

  objective: "Film nerd turned software developer with a keen focus on full stack web development as a means to solve customer and user needs, currently as applied to building automation and reporting tools for a globally renown electronics retailer.",
  
  sections: [
    {
      label: "Technical Skills",
      features: [
        { label: "Language Fluency", 
          value: ["Scala", "JavaScript (ES6", "Flow", "TypeScript)", "C#", "F#", "Python 2.7", "Java", "HTML", "CSS", "SQL (Oracle", "Postgres)"]},
        { label: "Paradigms", 
          value: ["OOP", "functional", "MVC"]},
        { label: "Methodologies", 
          value: ["Secular; proponent of the best solution for a given project"]},
        { label: "Web Stack", 
          value: ["Scala", "React", "Sangria (GraphQL)", "Oracle RDMS"]},
        { label: "Environments", 
          value: ["OS X", "Windows Enterprise", "various Linux distros", "PowerShell", "Bash Shell"]},
        { label: "Tools", 
          value: ["Visual Studio 2017", "Intellij IDEA", "VS Code", "Git"]},      
        { label: "Want to Learn", 
          value: ["Logic programming "]}
      ]
    },

    {
      label: "Employment History",
      features: [{
        organization: "B&H Photo",
        label: "Software Developer",
        dateRange: {startDate: "2017-09-01"},
        description: `Develop and maintain in-house software tools to assist various teams, including Web Content and Navigation.`,        bulletPoints: [
          `Own several projects, most notably "Attrify", a solution for data entry automation that deals with complex tech spec data know internally as "attributes"`,
          "Exposure to key JS libraries/frameworks such as React, Redux, lodash, Ant Design, and others",
          "Full stack experience with Scala/JVM backend",
          "Work self-directed as well as collaborate with various departments from Web Ops to UX"
        ]
      },
      {
        organization: "B&H Photo",
        label: "Technical Writer / Software Developer",
        dateRange: {startDate: "2013-08-01"},
        description: `A mixture of technical writing for the B&H website plus creation of ad hoc software tools to benefit Web Content team`,        
        bulletPoints: [
          "StyleChecker Chrome extension to validate product copy against in-house style infractions ",
          "Automated data entry for over 10,000 projection screen screes SKUs, clearing a years-long backlog in months"
        ]
      }]
    },

    {
      label: "Projects",
      features: [
        {
          organization: "B&H Photo",
          label: "Attrify Web Reporting Tool",
          dateRange: {startDate: "2018-02-01"},
          parenthetical: "React-Redux, Sangria",
          description: `React-Redux SPA web app to generate custom reports based on various data sources, primarily the database holding product data.`,
          bulletPoints: [
            "Scala Play Framework server component",
            "GraphQL gradually replacing REST/JSON APIs",
            "WebSocket interface for transferring data between Browser and Excel"
          ]
        },

        {
          label: "Attrify",
          dateRange: {startDate: "2016-04-01"},
          parenthetical: "Scala, Node.js",
          description: `Validates and bulk loads complex HTML form data, know internally as "attributes", into our Data Entry System/CMS via REST APIs.`,
          bulletPoints: [
            "Scala framework to manage batch processes, log errors, and tack progress",
            "JavaScript transformation and validation code (supports Browser client or runs as Node.js service on server)",
            "Oracle 11g/JDBC persistence of project data"          
          ]
        },

        {
          label: `Attrify "Spec Cleaning" Tool`,
          dateRange: {startDate: "2016-04-01"},
          description: `.NET (C#/F#) VSTO Excel add-in to automate onerous parts of converting legacy specifications to highly structured, category-bound "attributes"`
        },

        {
          label: "DESHelper",
          dateRange: {startDate: "2015-09-01"},
          description: "Chrome extension adding functionality to Data Entry System.",
          bulletPoints: [
            "Show navigational refinement values on product details preview page for QA inspection",
            "Save vendor asset portal login details per brand"]
        }
      ]
    },

    {
      label: "Education",
      features: [
        {
          organization: "Napier University, Edinburgh",
          label: "B.A. Honours Photography, Film and Imaging",
          dateRange: {startDate: "2002-09-01", endDate: "2006-05-01"},
        }
      ]
    }
  ],
  
}

export default db 