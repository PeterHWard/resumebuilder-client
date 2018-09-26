//@flow

const DEFAULT_INDENTATION = "15px"

const ResumePreviewStyles = (theme: any) => ({
  resumePaper: {
    width: "800px",
    margin: "auto",
    padding: "50px",
  },
  resume: {
    color: "#000000",
    fontSize: "10pt",
    fontFamily: "Arial, Helvetica, sans-serif"
  },
  resumePage: {
    margin: "auto"
  },

  dateRange: {},
  
  header: {
    display: "block",
    position: "relative",
    backgroundColor: "#f2f2f2",
    padding: "5px"
  },
  headerName: {
    color: "#400080",
    fontSize: "18pt",
    fontWeight: "bold",
    fontFamily: "Arial, Helvetica, sans-serif"
  },
  headerContactInfo: {
    color: "#000000",
    fontSize: "10pt",
    fontFamily: "Lucida Console, Courier, monospace"
  },
  headerTagLine: {
    marginTop: "10px",
    color: "#000000",
    fontSize: "12pt",
    fontStyle: "italic",
    fontFamily: "Arial, Helvetica, sans-serif"
  },

  section: {
    margin: "10px"
  },
  sectionLabel: {
    marginBottom: "3px",
    color: "#006666",
    fontSize: "11pt",
    fontWeight: "bold",
    fontFamily: "Georgia, serif"
  },
  sectionContent: {},

  feature: {},
  featureHeader: {
    width: "100%",
    display: "flex",
  },
  featureLabel: {
    width: "60%",
    fontWeight: "bold",
  },
  featureParens: {
    fontSize: "8pt",
    fontWeight: "bold"
  },
  featureDateRange: {
    textAlign: "right",
    width: "40%",
    fontSize: "8pt"
  },
  featureBlockText: {
    marginLeft: DEFAULT_INDENTATION
  },
  featureDescription: {},
  featureBulletPoints: {
    marginLeft: DEFAULT_INDENTATION
  },
  featureBulletPointItem: {},
  bulletPoint: {
    marginRight: "7px",
    fontWeight: "bold",
    fontSize: "8pt"
  },
  featureOrganization: {},
  featuresLV: {
    display: "flex",
    marginLeft: DEFAULT_INDENTATION
  },
  featureLVValues: {
    width: "80%"
  },
  featureLVLabel: {
    width: "20%",
    fontWeight: "bold"
  }
})


export type ResumePreviewStylesType = {
  dateRange: string,
  header: string,
  
  section: string,
  sectionLabel: string,
  sectionContent: string,

  feature: string,
  featureHeader: string,
  featureLabel: string,
  featureParens: string,
  featureDateRange: string,
  featureDescription: string,
  featureBulletPoints: string,
  featureBulletPointItem: string,
  featureOrganization: string,
  featuresLV: string,
  featureLVValues: string,
  featureLVLabel: string
}

export default ResumePreviewStyles