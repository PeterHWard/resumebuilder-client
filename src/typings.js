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
    tagLine: string,
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
    bulletPoints?: string[]
}

export type LabelValues = {
    label: string,
    values: string[]
}

export type FeatureUnion = ComplexFeatureData | LabelValues

export type SectionData = {
  label: string,
  features: FeatureUnion[]
}

export type ResumeData = {
    header: HeaderData,
    objective: string,
    sections: SectionData[]
}