//@flow
import React from "react"
import TextField from "@material-ui/core/TextField"
import Input from "@material-ui/core/Input"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"

import { withStyles } from "@material-ui/core/styles"

import PlusMinusList from "./PlusMinusList"
import type { PlusMinusRow } from "./PlusMinusList"

import type { 
  ComplexFeatureData,
  DateRangeData
} from "../typings"


const styles = (theme: any) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textFieldHalf: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textFieldFull: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  }
})


type MyTextFieldProps = {
  classes: any,
  width?: "full" | "half"
}

class MyTextFieldBase extends React.Component<any> {
  render() {
    const { classes, width } = this.props 
    const className = (width === "half") 
      ? classes.textFieldHalf
      : classes.textFieldFull
    return (<TextField  variant="outlined" 
                        margin="dense"
                        className={className} 
                        {... Object.assign({}, this.props, {
                          classes: undefined,
                          width: undefined
                        })}>
    
    </TextField>)
  }
}

const MyTextField = withStyles(styles)(MyTextFieldBase)


type EditDateRangeProps = DateRangeData & {
  classes: any,
  onChange: DateRangeData => void
}
const EditDateRange = (props: EditDateRangeProps) => {
  const { classes, startDate, endDate, onChange } = props
  
  return [(<MyTextField
      key="start"
      label="Start Date"
      type="date"
      value={startDate}
      width = "half"
      onChange={value=>onChange({startDate: value, endDate})}
      InputLabelProps={{
        shrink: true,
      }}
    />),
    (<MyTextField
      key="end"
      label="End Date"
      type="date"
      value={endDate}
      width = "half"
      onChange={value=>onChange({startDate, endDate: value})}
      InputLabelProps={{
        shrink: true,
      }}
    />)]
}


type EditComplexFeatureProps = {
  classes: any,
  open: boolean,
  feature: ComplexFeatureData,
  onSave: ComplexFeatureData => void,
  onCancel: () => void
}

type EditComplexFeatureState = {
  organization: string,
  label: string,
  parenthetical: string,
  dateRange: DateRangeData,
  description: string,
  bulletPoints: PlusMinusRow<string>[]
}

class EditComplexFeatureBase extends React.Component<EditComplexFeatureProps, EditComplexFeatureState> {
  constructor(props: EditComplexFeatureProps) {
    super(props)
    const { 
      dateRange, 
      organization, 
      label, 
      parenthetical,
      description,
      bulletPoints
     } = props.feature
    
    this.state = {
      organization: organization || "",
      label: label,
      parenthetical: parenthetical || "",
      dateRange: dateRange,
      description: description || "",
      bulletPoints: (bulletPoints && bulletPoints.length 
        ? bulletPoints 
        : [""]).map((bp, idx)=>this.mkBulletPoint(bp)(idx))
    }
  }

  handleChange = (name: string) => (event: any) => {
    const value = event.target ? event.target.value : event
    this.setState({[name]: value})
  }
 
  mkBulletPoint = (value: string) => (idx: number) => {
    const { classes } = this.props    
    return {
      key: idx,
      value: value,
      content: (<MyTextField   
        width = "full"
        onChange={(nextValue)=>{
          const bps = this.state.bulletPoints
          this.handleChange("bulletPoints")(
            [].concat(bps.slice(0, idx),
            this.mkBulletPoint(nextValue),
            bps.slice(idx)))
        }}
        value={value} />)
    }
  }

  handleClose = (isSave: boolean) => () => {
    if (isSave) {
      this.props.onSave({
        organization: this.state.organization.trim() || undefined,
        label: this.state.label,
        parenthetical: this.state.parenthetical.trim() || undefined,
        dateRange: this.state.dateRange,
        description: this.state.description.trim() || undefined,
        bulletPoints: this.state.bulletPoints
          .map(b=>b.value.trim())
          .filter(v=>v.length)
      })
    } else {
      this.props.onCancel()
    }
  }

  render() {
    const { classes, open } = this.props
    const { 
      dateRange, 
      organization, 
      label, 
      parenthetical,
      description,
      bulletPoints
    } = this.state
    
    return (<Dialog
        open={open}
        onClose={this.handleClose(false)}>
      <DialogTitle id="form-dialog-title">Edit Feature</DialogTitle>
        <DialogContent>
          <div>
            <EditDateRange  classes={classes} 
                            onChange={this.handleChange("dateRange")}
                            {... dateRange} />
          </div>
          <div>
            <MyTextField  label="Organization" 
                          variant="outlined"
                          width = "full"  
                          onChange={this.handleChange("organization")}
                          value={organization || ""} />
          </div>
          <div>
            <MyTextField  label="Label" 
                          required
                          width = "full"
                          onChange={this.handleChange("label")}
                          value={label} />
            
            <MyTextField  label="Parenthetical" 
                  className={classes.textFieldHalf} 
                  onChange={this.handleChange("parenthetical")}
                  value={parenthetical || ""} />
          </div> 
          <div>
            <MyTextField  label="Description" 
                multiline
                width = "full"
                onChange={this.handleChange("description")}
                value={description || ""} />
          </div>  
          <div>
            <PlusMinusList  classes={classes}
                    onChange={this.handleChange("bulletPoints")}
                    emptyRow={this.mkBulletPoint("")}
                    rows={bulletPoints} />
          </div>    
        </DialogContent>
      <DialogActions>
        <Button onClick={this.handleClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={this.handleClose(true)} color="primary">
          Update
        </Button>
      </DialogActions>  
    </Dialog>)
  }
}

export const EditComplexFeature = withStyles(styles)(EditComplexFeatureBase)