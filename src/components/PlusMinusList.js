//@flow
import React from "react"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import AddIcon from "@material-ui/icons/AddBox"
import RemoveIcon from "@material-ui/icons/DeleteOutlined"
import UpIcon from "@material-ui/icons/KeyboardArrowUp"
import DownIcon from "@material-ui/icons/KeyboardArrowDown"

import { withStyles } from "@material-ui/core/styles"

import type { } from "../typings"
import { ActionRows } from "./helpers"
import type { ActionRowsAction as Action } from "./helpers"


const styles = (theme: any) => ({
  buttonIcon: {
    cursor: "pointer"
  },
  tools: {
    position: "absolute",
    right: "0px"
  }
})


type RowProps = {
  classes: any,
  row: PlusMinusRow,
  onAction: Action => void
}

type RowState = {
  showTools: boolean
}

class Row extends React.Component<RowProps, RowState> {
  constructor(props: RowProps) {
    super(props)
    this.state = {
      showTools: false
    }
  }

  render() {
    const { classes, row, onAction } = this.props
    const { showTools } = this.state

    return (<ListItem key={row.key} 
                      className={classes.plusMinusRow}
                      onMouseEnter={()=>this.setState({showTools: true})}
                      onMouseLeave={()=>this.setState({showTools: false})}> 

      <div key="content"> {row.content} </div>
      {showTools ? <div key="tools" className={classes.tools}>
        <div key="row-1">
          <AddIcon className={classes.buttonIcon} onClick={()=>onAction("insert")}/>
          <UpIcon className={classes.buttonIcon} onClick={()=>onAction("move-up")} /></div>
        <div key="row-2">
          <RemoveIcon className={classes.buttonIcon} onClick={()=>onAction("delete")} />
          <DownIcon className={classes.buttonIcon} onClick={()=>onAction("move-down")} />
        </div>
      </div> : ""}
    </ListItem>)
  }
}


export type PlusMinusRow = {
  key: string | number,
  content: any // React component
}

type PlusMinusListProps = {
  classes: any,
  rows: PlusMinusRow[],  
  onChange: PlusMinusRow[] => void,
  emptyRow: number => PlusMinusRow // Takes index for next row, returns row
}

const PlusMinusListBase = (props: PlusMinusListProps) => {
  const { classes, rows, onChange, emptyRow } = props
  const ars = new ActionRows({rows, onChange, emptyRow})

  return (<List className={classes.plusMinusList}>
    {rows.map((row, idx)=>{
      return (<Row  classes={classes} 
                    key={idx} 
                    row={row} 
                    onAction={ars.handleAction(idx)} />)
    })}
  </List>)
}


const PlusMinusList = withStyles(styles)(PlusMinusListBase)

export default PlusMinusList