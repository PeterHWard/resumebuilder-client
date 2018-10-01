//@flow
import React from "react"

import Paper from "@material-ui/core/Paper"

import { withStyles } from "@material-ui/core/styles"

import { EditComplexFeature } from "./Editing"

import type {
  ResumeData,
  HeaderData,
  ComplexFeatureData,
  LabelValue,
  DateRangeData,
  BlockText,
  FeatureUnion
} from "../typings"

import styles from "../styles/ResumePreviewStyles"
import type { ResumePreviewStylesType as Classes } from "../styles/ResumePreviewStyles"
import EditControls from "./EditControls"
import ActionRows from "./ActionRows"


const DateRange = (props: DateRangeData & { classes: Classes }) => {
  const MONTHS = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const mkDate = (date) => {
    // expects yyyy-mm-dd format
    const split = date.split("-")
    const year = split[0]
    const month = MONTHS[Number(split[1])]
    return (<span key={date}>{month + " " + year}</span>)
  }

  const { classes, startDate, endDate } = props
  return (<div className={classes.dateRange}>
    {"<"}{endDate
      ? [mkDate(startDate), " to ", mkDate(endDate)]
      : ["From ", mkDate(startDate)]}{">"}
  </div>)
}


type HeaderProps = HeaderData & { classes: Classes }
const Header = (props: HeaderProps) => {
  const { classes, name, address, email, mobile, gitHub, tagLine } = props
  const contactInfo = [address, mobile, email, gitHub]
    .filter(c=>c)
    .join(" || ")
  
  return (<div className={classes.header}>
    <div className={classes.headerName}>{name}</div>
    <div className={classes.headerContactInfo}>{contactInfo}</div>
    <div className={classes.headerTagLine}>{tagLine}</div>
  </div>)
}


type ComplexFeatureProps = ComplexFeatureData & { classes: Classes }

const ComplexFeature = (props: ComplexFeatureProps) => {
  const { 
    classes, 
    organization, 
    label, 
    parenthetical, 
    dateRange, 
    description, 
    sellingPoints 
  } = props

  return (<div className={classes.feature}>
    {organization ? <div className={classes.featureOrganization}>{organization}</div> : ""}
    <div className={classes.featureHeader}>
      <div className={classes.featureLabel}>
        {label}
        <span className={classes.featureParens}>{parenthetical ? ` (${parenthetical})` : ""}</span>
      </div>
      <div className={classes.featureParens}></div>
      <div className={classes.featureDateRange}>
        <DateRange classes={classes} {... dateRange} />
      </div>
    </div>
    {description ? <div className={classes.featureDescription}>
      {description}
    </div> : ""}
    {sellingPoints && sellingPoints.length ? <div className={classes.featureBulletPoints}>
      {sellingPoints.map(bp=>(<div key={bp} className={classes.featureBulletPointItem}>
        <span className={classes.bulletPoint}>{"•"}</span> {bp}
      </div>))}
    </div>: ""}
    
  </div>)
}


type LabelValuesFeatureProps = LabelValue & { classes: Classes } 

const LabelValuesFeature = (props: LabelValuesFeatureProps) => {
  const { classes, label, value } = props
  return (<div className={classes.featuresLV}>
    <div className={classes.featureLVLabel}>{label + ": "}</div>
    <div className={classes.featureLVValues}>
      {value instanceof Array ? value.join(", ") : value}
    </div>
  </div>)
}


type SectionProps = {
  classes: Classes,
  label: string,
  children: any
}

const Section = (props: SectionProps) => {
  const { classes, label, children } = props
  
  return (<div className={classes.section}>
    <div className={classes.sectionLabel}>{label}</div>
    <div className={classes.sectionContent}>
      {children}
    </div>
  </div>)
}


type SectionComplexFeaturesProps = {
  classes: Classes,
  label: string,
  features: ComplexFeatureData[],
  onChange: ComplexFeatureData[] => void
}

type SectionComplexFeaturesState = {
  editingFeature: number
}

class SectionComplexFeatures extends React.Component<SectionComplexFeaturesProps, SectionComplexFeaturesState> {
  constructor(props: SectionComplexFeaturesProps) {
    super(props)
    this.state = {
      editingFeature: -1
    }
  }

  render() {
    const { classes, label, features, onChange } = this.props
    const { editingFeature } = this.state
    
    const ars = new ActionRows({
      rows: features, 
      onChange,
      emptyRow: ignored => ({
        label: "New Feature",
        dateRange: {startDate: ""}
      }),
      onEdit: idx => this.setState({editingFeature: idx})
    })

    const handleSelect = action => {
      ars.handleAction(action)
    }

    return (<Section classes={classes} label={label}>
        {features.map((f, idx)=>(
          <EditControls options={ars.options} onSelect={ars.handleAction(idx)}>
            <ComplexFeature key={f.label} classes={classes} {... f} />
          </EditControls>))}
        
        {editingFeature > -1 ? <EditComplexFeature open={true} 
                            onCancel={()=>this.setState({editingFeature: -1})}
                            onSave={nextFeatures => {
                              ars.update(editingFeature)
                              this.setState({editingFeature: -1})
                            }}
                            feature={features[editingFeature]} /> : ""}
      </Section>)
  }
}


type SectionLabelValuesFeaturesProps = {
  classes: Classes,
  label: string,
  features: LabelValue[]
}

const SectionLabelValuesFeatures = (props: SectionLabelValuesFeaturesProps) => {
  const { classes, label, features } = props
  return (
    <Section classes={classes} label={label}>
      {features.map(f=>(<LabelValuesFeature key={f.label} classes={classes} {... f} />))}
    </Section>
  )
}


type SectionBlockTextProps = BlockText & { classes: Classes }

const SectionBlockText = (props: SectionBlockTextProps) => {
  const { classes, label, text } = props
  return (<Section classes={classes} label={label}>
    <div className={classes.featureBlockText}>{text}</div>
  </Section>)
}


export type ResumeProps = ResumeData & {
  classes: Classes,
  withPaper?: boolean,
  onChange: ResumeData => void
}

const ResumePreviewBase = (props: ResumeProps) => {
  const { 
    classes,
    header, 
    objective,
    onChange,
    withPaper
  } = props

  const ars = new ActionRows({
    rows: props.sections, 
    onChange: nextSections => {
      onChange(Object.assign({}, props, {sections: nextSections}))
    },
    emptyRow: ignored => ({
      label: "New Section",
      features: []
    }),
    onEdit: idx => {}
  })

  const sections = props.sections
    .map((section, idx)=>{
      const handleUpdate = (nextFeatures) => {
        ars.update(idx)(Object.assign({}, section, {
          features: nextFeatures
        }))
      }

      if (!section.features || !section.features.length) {
        return (<div>TODO: Create feature buttons</div>)
      
      } else if (section.features[0].value) {
        const features: LabelValue[] = (section.features: any)
        return (<SectionLabelValuesFeatures 
          key={section.label} 
          classes={classes}
          label={section.label}
          features={features} />)
      
      } else {
        const features: ComplexFeatureData[] = (section.features: any) || []
        return (<SectionComplexFeatures 
          key={section.label}
          classes={classes}
          label={section.label}
          onChange={handleUpdate}
          features={features} />)
      }
    })
  
    if (withPaper)
      return (
        <Paper elevation={1} className={classes.resumePaper}>
          <div id={"resume"} className={classes.resumePage}>
            <div className={classes.resume}>
              <Header key="header" classes={classes} {... header} /> 
              <SectionBlockText key="objective" classes={classes} label="Objective" text={objective} />
              {sections}
            </div>
          </div>
        </Paper>)
    else return (
      <div id={"resume"} style={{
          width: "100%",
          backgroundColor: "#ffffff", 
          padding: "50px"}}>
        <div style={{maxWidth: "750px", minWidth: "750px"}} className={classes.resume}>
          <Header key="header" classes={classes} {... header} /> 
          <SectionBlockText key="objective" classes={classes} label="Objective" text={objective} />
          {sections}
        </div>
      </div>
    )
}

const ResumePreview = withStyles(styles)(ResumePreviewBase)
export default ResumePreview 
