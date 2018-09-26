//@flow
import type {
  ResumeData
} from "./typings"

const db: ResumeData = {
  header: {
    name: "Peter Ward",
    address: "175 Eastern Parkway, Brooklyn, NY 11238",
    mobile: "+1 775 223 4210",
    email: "peterhartward@gmail.com",
    tagLine: "Copywriter/camera nerd turned Pythonista, creating custom product data management solutions for e-commerce..."
  },
  objective: "Applying a unique perspective garnered as a copywriter plus a passion for software development to the creation of data wrangling methods and automation techniques that enable maximum UX flexibility, while promoting customer-focused sales tool design.",
  
  sections: [
    {
      label: "Technical Skills",
      features: [
        { label: "Languages", values: ["Python", "JavaScript", "OCaml", "SQL", "Regex", "JSON", "XML", "DOM"]},
        { label: "Paradigms", values: ["OOP", "Aspect-Oriented Programming", "Functional Programing"]},
        { label: "Methodologies", values: ["Secular; proponent of the best tool for a given project"]},
        { label: "Web Stack", values: ["Apache", "Django", "PostgreSQL", "MongoDB", "OpenSSL; node.js"]},
        { label: "Environments", values: ["CentOS 7", "OS X/MacPorts", "Cygwin; Bash", "PowerShell; Eclipse"]},
        { label: "Tools", values: ["PyInstaller", "Pyenv; Scrapy; VirtualBox", "GitHub; Bugzilla", "WorkZone"]},      
        { label: "Writing", values: ["Technical writing", "product copy; screen writing"]},
        { label: "Video Production", values: ["Shooting and editing using various HD and 4K equipment"]},
        { label: "Want to Learn", values: ["Logic programming "]}
      ]
    },

    {
      label: "Employment History",
      features: [{
        organization: "B&H Photo",
        label: "Software Developer",
        dateRange: {startDate: "2013-08-01"},
        description: "Software development for special projects, including “SKU Builder” and “Style Checker” (above)",
        bulletPoints: [
          "Software development for special projects, including “SKU Builder” and “Style Checker” (above)"
        ]
      }]
    },

    {
      label: "Projects",
      features: [
        {
          label: "StyleChecker",
          dateRange: {startDate: "2014-08-01"},
          parenthetical: "Chrome extension; JavaScript",
          description: "Spell-check style tool for highlighting potential B&H writing style violations while suggesting corrections. Deployed as Chrome extension; injected into CMS software via content scripts"
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