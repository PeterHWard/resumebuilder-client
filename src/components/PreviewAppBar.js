//@flow
import React from "react"
import ReactDOM from "react-dom"

import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

import { withStyles } from "@material-ui/core/styles"

import NewWindow from "react-new-window"

import wordExport from "../services/WordExport"

import ResumePreview from "./ResumePreview"
import type { ResumeData } from "../typings"


const styles = theme => ({
  grow: {
    flexGrow: 1,
  }
})


const PrintWindow = (props: ResumeData) => {
  // To enable features cf. https://developer.mozilla.org/en-US/docs/Web/API/Window/open#Window_features
  return (<NewWindow  title={"Résumé Preview - Printer Friendly"}>
    <ResumePreview {... props}/>
  </NewWindow>)
}


type PreviewAppBarProps = {
  classes: any,
  resumeData: ResumeData
}

class PreviewAppBarBase extends React.Component<PreviewAppBarProps> {
  handleWordExport = () => () => {
    const styles = document.getElementsByTagName("style")
    let styleHTML
    for (let i = 0; true; i++) {
      const style = styles[i]
      if (!style) break
      if (style.getAttribute("data-meta") === "ResumePreviewBase") {
        styleHTML = style.innerHTML
        break
      }
    }
    // $FlowFixMe - We'll have faith `resume` element now exists 
    wordExport("test", document.getElementById("resume").innerHTML, styleHTML) 
  }

  handleShowPF = () => () => {
    if (!window.pfWindow) {
      const div = document.createElement("div")
      div.id = "pfWindow"
      div.className = "hidden"
      document.body && document.body.appendChild(div)
    }
    
    ReactDOM.render(
      <PrintWindow {... this.props.resumeData} />, 
      window.pfWindow)
  }

  render() {
    const { classes } = this.props
    return (
      <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Résumé Preview
            </Typography>
            <Button color="inherit" onClick={this.handleShowPF()}>
              Printer Friendly
            </Button>
            <Button color="inherit" onClick={this.handleWordExport()}>  
              Word
            </Button>
          </Toolbar>
        </AppBar>
    )
  }
}

const PreviewAppBar = withStyles(styles)(PreviewAppBarBase)

export default PreviewAppBar