//@flow
import React from "react"

import { withStyles } from "@material-ui/core/styles"

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
export default App

