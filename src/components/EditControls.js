// @flow
import React from "react"
/*import EditIcon from "@material-ui/icons/Edit"
import AddIcon from "@material-ui/icons/AddBox"
import RemoveIcon from "@material-ui/icons/DeleteOutlined"
import UpIcon from "@material-ui/icons/KeyboardArrowUp"
import DownIcon from "@material-ui/icons/KeyboardArrowDown"*/
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { withStyles } from "@material-ui/core/styles"


const styles = (theme: any) => ({
  buttonIcon: {
    cursor: "pointer"
  },
  tools: {
    position: "absolute",
    right: "0px"
  }
})



type EditControlsProps = {
  classes: any,
  children: any,
  onSelect: string => void,
  options: {label: string, value: string}[]
}

type EditControlsState = {
  showControls: boolean,
  showMenu: boolean,
  anchorEl: any
}

class EditControlsBase extends React.Component<EditControlsProps, EditControlsState> {
  constructor() {
    super()
    this.state = {
      showControls: false,
      showMenu: false,
      anchorEl: null
    }
  }

  handleClick = (event: any) => {
    this.setState({ 
      showMenu: true,
      anchorEl: event.currentTarget 
    })
  }

  handleClose = () => {
    this.setState({showMenu: false, anchorEl: null})
  }

  handleSelect = (action: string) => (event: any) => {
    this.handleClose()
    this.props.onSelect(action)
  }

  render() {
    const { classes, children } = this.props
    const { showControls, showMenu, anchorEl } = this.state
    const menuItems = this.props.options.map(option=>(
      <MenuItem key={option.value} 
                onClick={this.handleSelect(option.value)}>{option.label}</MenuItem>
    ))

    return (
      <div  style={{position: "relative", display: "block"}}
          onMouseEnter={() => this.setState({showControls: true})}
          onMouseLeave={() => this.setState({showControls: false})}>
        {children}
        {showControls || showMenu ? <div style={{
            position: "absolute", 
            backgroundColor: "rgb(102, 255, 102, 0.11)",
            height: "100%",
            width: "100%", top: "0", left:"0"}}>
          <div style={{
              position: "absolute", 
              left: "-50px", top: "0"}}>
             <IconButton onClick={this.handleClick}><MoreVertIcon /></IconButton>
             <Menu
                anchorEl={anchorEl}
                open={showMenu}
                onClose={this.handleClose}
                PaperProps={{
                  style: { width: 200 }}}>      
                {menuItems}
              </Menu>
          </div>
        </div> : ""}
      </div>
    )
  }
}

const EditControls = withStyles(styles)(EditControlsBase)
export default EditControls