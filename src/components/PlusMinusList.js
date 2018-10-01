//@flow
import React from "react"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import AddIcon from "@material-ui/icons/AddBox"
import RemoveIcon from "@material-ui/icons/DeleteOutlined"
import UpIcon from "@material-ui/icons/KeyboardArrowUp"
import DownIcon from "@material-ui/icons/KeyboardArrowDown"
import IconButton from "@material-ui/core/IconButton"

import { withStyles } from "@material-ui/core/styles"

import type { } from "../typings"
import { ActionRows } from "./helpers"
import type { ActionRowsAction as Action } from "./helpers"


const styles = (theme: any) => ({
  buttonIcon: {
    cursor: "pointer"
  },
  plusMinusRow: {
    display: "block",
    width: "800px"
  },
  tools: {
    marginTop: "auto",
    marginBottom: "auto"
  }
})


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


type RowProps<V> = {
  idx: number,
  value: V,
  onChange: V => void
}
type PlusMinusListProps<V> = {
  classes: any,
  onChange: any[] => void,
  values: V[],
  defaultValue: V,
  makeRow: RowProps<V> => any
}

const PlusMinusListBase = (props: PlusMinusListProps<V>) => {
  const { classes, values, onChange, makeRow, defaultValue } = props
  
  const ars = new ActionRows({
    rows: values, 
    onChange, 
    emptyRow: idx => defaultValue})

  const handleClick = (idx: number, action: Action) => {
    const partial = ars.handleAction(idx)
    return () => {
      partial(action)
    }
  }

  return (<div>{values.map((value, idx)=> {
    const child = makeRow({idx, value, onChange: ars.update(idx)})
    return (<div key={idx} className={classes.plusMinusRow}>
      <div>{child}</div>
      <div className={classes.tools}>
        <IconButton onClick={handleClick(idx, "insert")}><AddIcon/></IconButton> 
        <IconButton onClick={handleClick(idx, "delete")}><RemoveIcon/></IconButton>
        <IconButton onClick={handleClick(idx, "move-up")}><UpIcon/></IconButton>
        <IconButton onClick={handleClick(idx, "move-down")}><DownIcon/></IconButton>
      </div>
    </div>)
  })
}</div>)
}


const PlusMinusList = withStyles(styles)(PlusMinusListBase)

export default PlusMinusList