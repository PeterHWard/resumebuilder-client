//@flow

type DateMonthResData = string // expects yyyy-mm-dd format
export type DateRangeData = {
    startDate: DateMonthResData,
    endDate?: DateMonthResData
}

export type HeaderData = {
    name: string,
    address: string,
    email: string,
    mobile: string,
    tagLine?: string,
    gitHub?: string
}

export type BlockText = { 
    label: string, 
    text: string 
}


export type ComplexFeatureData = {
    organization?: string,
    label: string,
    parenthetical?: string,
    dateRange: DateRangeData,
    description?: string,
    sellingPoints?: string[]
}

export type LabelValue = {
    label: string,
    value: string | string[]
}

export type FeatureUnion = ComplexFeatureData | LabelValue

export type SectionData = {
  label: string,
  features: FeatureUnion[]
}

export type ResumeData = {
    header: HeaderData,
    objective: string,
    sections: SectionData[]
}