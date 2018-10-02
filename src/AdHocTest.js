// @flow
import React from "react"

import { EditComplexFeature } from "./components/Editing"


class AdHocTest extends React.Component<any> {
  render() {
    const feature = {
      organization: "B&H",
      label: "Copy & Paste",
      parenthetical: "Python",
      dateRange: {startDate: "2014-08-01", endDate: "2018-08-01"},
      sellingPoints: [
        "Python with Tkinter UI", 
        "PyInstaller standalone application",
        "Massive productivity enhancer"],
      description: `On own initiative, wrote and maintain a Python- and regular expression-driven GUI application designed to eliminate many labor-intensive parts of the web copywriting process, such as tedious spec formatting`
    }
    return (
      <div>
        <EditComplexFeature open={true} 
                            onCancel={()=>{}}
                            onSave={nextFeature=>{
                              console.log(nextFeature)
                            }}
                            feature={feature} />
      </div>
    );
  }
}

export default AdHocTest