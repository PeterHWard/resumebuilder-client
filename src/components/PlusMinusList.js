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
import EditingControls from "./EditControls"


const styles = (theme: any) => ({
  buttonIcon: {
    cursor: "pointer"
  },
  plusMinusRow: {
    display: "block",
    width: "100%",
    position: "relative"
  },
  tools: {
    position: "absolute",
    right: "0px",
    top: "0px"
  }
})



export type PlusMinusRow<V> = {
  key: string | number,
  content: any, // React component
  value: V
}

/*
type RowProps<V> = {
  classes: any,
  row: PlusMinusRow<V>,
  onAction: Action => void
}

type RowState = {
  showTools: boolean
}

class Row<V> extends React.Component<RowProps<V>, RowState> {
  constructor(props: RowProps<V>) {
    super(props)
    this.state = {
      showTools: false
    }
  }

  render() {
    const { classes, row, onAction } = this.props
    const { showTools } = this.state

    return (<div key="content"  key={row.key} 
                          className={classes.plusMinusRow}
                          onMouseEnter={()=>this.setState({showTools: true})}
                          onMouseLeave={()=>this.setState({showTools: false})}> 
        {row.content} 
      {showTools ? <div key="tools" className={classes.tools}>
        <div key="row-1">
          <AddIcon className={classes.buttonIcon} onClick={()=>onAction("insert")}/>
          <UpIcon className={classes.buttonIcon} onClick={()=>onAction("move-up")} />
        </div>
        <div key="row-2">
          <RemoveIcon className={classes.buttonIcon} onClick={()=>onAction("delete")} />
          <DownIcon className={classes.buttonIcon} onClick={()=>onAction("move-down")} />
        </div>
      </div> : ""}
    </div>)
  }
}
*/

type RowControlsProps = {
  classes: any,
  show: boolean,
  onAction: string => void
}

class RowControls extends React.Component<RowControlsProps> {
  render() {
    const { show, classes, onAction } =  this.props
    
    if (show) return (
      <div key="tools" className={classes.tools}>
        <div key="row-1">
          <AddIcon className={classes.buttonIcon} onClick={()=>onAction("insert")}/>
          <UpIcon className={classes.buttonIcon} onClick={()=>onAction("move-up")} />
        </div>
        <div key="row-2">
          <RemoveIcon className={classes.buttonIcon} onClick={()=>onAction("delete")} />
          <DownIcon className={classes.buttonIcon} onClick={()=>onAction("move-down")} />
        </div>
      </div>
    )
  }
}


type PlusMinusListProps<V> = {
  classes: any,
  rows: PlusMinusRow<V>[], // React components
  onChange: any[] => void,
  emptyRow: number => PlusMinusRow<V> // Takes index for next row, returns row
}

const PlusMinusListBase = (props: PlusMinusListProps<V>) => {
  const { classes, rows, onChange, emptyRow } = props
  const ars = new ActionRows({rows: rows.map(r=>r.value), onChange, emptyRow})

  return (<div>{rows.map((row, idx)=> {
    return (<EditingControls  key={row.key}
                              options={[]}
                              classes={classes}
                              className={classes.plusMinusList} 
                              children={row.content} 
                              onSelect={ars.handleAction(idx)} />
    )
  })
}</div>)
}


const PlusMinusList = withStyles(styles)(PlusMinusListBase)

export default PlusMinusList