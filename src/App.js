//@flow
import React from "react"

import { withStyles } from "@material-ui/core/styles"

import { EditComplexFeature } from "./components/Editing"
import ResumePreview from "./components/ResumePreview"
import PreviewAppBar from "./components/PreviewAppBar"
import db from "./database"
import type { ResumeData } from "./typings"


const styles = (theme: any) => ({
  root: {
    backgroundColor: "#f2f2f2"
  },
  main: {
    height: "100vh",
    paddingTop: "50px"
  }
})


type AppProps = {
  classes: any 
}

type AppState = {
  resume: ResumeData
}

class AppBase extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      resume: db
    }
  }

  render() {
    const { classes } = this.props
    const { resume } = this.state

    return (
      <div className={classes.root}>
        <PreviewAppBar resumeData={db} />
        <div id="main" className={classes.main}>
          <ResumePreview {... resume} 
            withPaper={true}
            onChange={nextResume=>this.setState({resume: nextResume})} />
        </div>
      </div>)
  }
}

const App = withStyles(styles)(AppBase)


class AdHocTest extends React.Component<any> {
  render() {
    const feature = {
      organization: "B&H",
      label: "Copy & Paste",
      parenthetical: "Python",
      dateRange: {startDate: "2014-08-01", endDate: "2018-08-01"},
      bulletPoints: [
        "Python with Tkinter UI", 
        "PyInstaller standalone application",
        "Massive productivity enhancer"],
      description: `On own initiative, wrote and maintain a Python- and regular expression-driven GUI application designed to eliminate many labor-intensive parts of the web copywriting process, such as tedious spec formatting`
    }
    return (
      <div>
        <EditComplexFeature open={true} 
                            onCancel={()=>{}}
                            onSave={nextFeature=>{
                              console.log(nextFeature)
                            }}
                            feature={feature} />
      </div>
    );
  }
}

export default AdHocTest
