## Project Structure 
The basic layout:

```
root/
└── src/
    ├── services/
    ├── components/
    ├── styles/
    ├── typings.js
    ├── index.js
    ├── index.css
    ├── database.js
    └── App.js
```


### components/
Follow the Java strategy of one source file per publicly exposed component. Saying that, during development it may be prudent to mix related components in a single source file while the code base remains fluid. 


### typings.js
Use for globally applicable types, including object data sources that may be passed to components. Types that are specific to a particular class/module should be be defined within the relevant module, but can be exported if a consumer may want them. This applies especially to React props. 

If a React component's props type or state type is identical to a globally defined data type, the prop or state type should alias/extend the data type rather than use it directly.  


### database.js
A static JS file of type `ResumeData` that initially feeds the react component tree. This is temporary - in future initial data will be pulled from server or local storage. 


## Indentation
Use 2-space indentation for all JavaScript source files.


## Naming
### Types
Types that feed data to React components should be suffixed with `Data`. E.g.,

Component: `MyComponent`
Data Source Type: `MyComponentData`

One is tempted to use the same name for both, but this leads to collisions, forcing the type name to be aliased. 

React props types should suffix the component name with `Props`. Similarly React state types should suffix the component name with `State`. 


### React Components 
Since we are using JSS, unstyled components to be wrapped with `withStyles` should be suffixed with `Base`. E.g.:

UnStyled: `MyComponentBase`
Style: `MyComponent`

This is ugly and verbose. However it avoid breaking the API should the `withStyles` HOC be removed in future. Of course where default exports are used the public API would not be affected. Still, this strategy simplifies internal house keeping and helps prevent forgetting to apply withStyles to the exported component.


## CSS
`site.css` is kept for the sake of convention. However non-global styles as well as global themes should be applied using via JSS (Material-UI port) `withStyles`.  In general, styles should be defined with their associated components. 

One exception is the styles function used by the resume itself. This resides in a dedicated file enabling easier drop in replacement.