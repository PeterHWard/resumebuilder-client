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
    width: 500,
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
  bulletPoints: string[]
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
      sellingPoints
    } = props.feature
    
    this.state = {
      organization: organization || "",
      label: label,
      parenthetical: parenthetical || "",
      dateRange: dateRange,
      description: description || "",
      bulletPoints: sellingPoints && sellingPoints.length 
        ? sellingPoints
        : [""]
    }
  }

  handleChange = (name: string) => (event: any) => {
    const value = event.target ? event.target.value : event
    this.setState({[name]: value})
  }
 
  mkBulletPoint = (args: {idx: number, value: string, onChange: string => void}) => {
    const { classes } = this.props   
    const { idx, value, onChange} = args
    
    return (<MyTextField   
        multiline
        label={"Selling Point #" + (idx + 1).toString()}
        width = "full"
        onChange={event=>onChange(event.target.value)}
        value={value} />
    )
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
          .map(b=>b.trim()).filter(v=>v.length)
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
      <DialogTitle>Edit Feature</DialogTitle>
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
                          width = "full"
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
            <PlusMinusList  makeRow={this.mkBulletPoint}
                            onChange={this.handleChange("bulletPoints")}
                            defaultValue={""}
                            values={bulletPoints} />
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