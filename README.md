Resume Builder uses React to dynamically render the applicant's resume. This allows the applicant to cherry pick which portions of their base resume they wish to use when applying for a particular role. In addition, content can be edited or added ad hoc to allow greater role-specific customization. 

The rendered resume can be viewed in "printable" form, ideal for saving as a PDF. Additionally, it can be "downloaded" in a Word-compatible (.doc) file (see Word Export below for limitations). 


## Usage
No distribution at this time. Clone repo and run `npm run start`. Replace `database.js` with own resume data.


## Word Export
Inspired by [jQuery Word Export](https://github.com/markswindoll/jQuery-Word-Export), places HTML content of the resume in a blob that is then "downloaded" via FileSaver.js. Through the file extension and MIME type indicate a bona fide .doc Word document, the file contents remain HTML. For this reason, applications besides MS Word may not read the document correctly.

Unlike jQuery Word Export, no modification of the HTML is made other than placing the resume fragment with the body a complete HTML document. For this reason, elements like images will lost.


## Resume API
The root datasource, the `ResumeData` type, features the following shape:

```
{
    header: HeaderData,
    objective: string,
    sections: SectionData[]
}
```


### HeaderData
This is contains the applicant's name, contact details, and an optional tag line.

```
{
    name: string,
    address: string,
    email: string,
    mobile: string,
    tagLine?: string,
    gitHub?: string
}
```


### Objective
A text block ideally no more than a few lines introducing the applicant.


### SectionData
Sections are the main content of the resume: core competencies, employment history, projects, etc. Each section contains a label (header text) and an array of `Features`.

```
{
  label: string,
  features: ComplexFeature[] | LabelValue[]
}
```


### ComplexFeatureData
Designed to be flexible, a `ComplexFeature` takes the shape:

```
{
    label: string,
    organization?: string,
    parenthetical?: string,
    dateRange: DateRangeData,
    description?: string,
    sellingPoints?: string[]
}
```

Since complex features are intended to be able to convey a variety of information, field names have been purposefully kept generic. 

`label`: The feature title, such as the job title, degree name, or project name,
`organization`: The relevant institution, such as company or university, if applicable.
`parenthetical`: Follows the `label` to optionally provide additional qualification.
`dateRange`: The start date and optionally end data for the feature.
`description`: A (hopefully brief) overview of the feature. 
`sellingPoints`: A bullet point list of notable callouts, such as accomplishments or skills attainted. 

A `ComplexFeature` can contain just a `description` or it can contain just `sellingPoints`, however at least one or the other is expected. 


### LabelValue
An other type of `Feature` is a simple label/value structure.

```
{
    label: string,
    value: string | string[]
}
```

It is useful for dedicating a section to listing general information, such as technical skills or core competencies, independent of any particular role or project.


### DateRangeData
Takes a start data and optionally an end date string. Currently only the `yyyy-mm-dd` format is supported.

```
{
    startDate: string,
    endDate?: string
}
```


## To Dos
- Editing of LabelValue features.
- Editing of Header,
- Replace backed in `objective` section with customizable `TextBlock` feature.
- Sever component to persist base resume as well as arbitrary sub resumes and forks from the base resume.