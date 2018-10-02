// @flow
import React from "react"
import ReactDOM from "react-dom"

import Aviator from "aviator"

import "./index.css"
import App from "./App"
import AdHocTest from "./AdHocTest"


class AppTarget {
  static load() {
    // $FlowFixMe
    ReactDOM.render(<App />, document.getElementById("root"))
  }
}


class TestTarget {
  static load() {
    // $FlowFixMe
    ReactDOM.render(<AdHocTest />, document.getElementById("root"))
  }
}

class Errors {
  static notFound() {
    ReactDOM.render(<div>
      <h2>Error: Route does not exist</h2>
    </div>, 
    // $FlowFixMe
    document.getElementById("root"))
  }
}


Aviator.setRoutes({
  "/": {
    target: AppTarget,
    "/": "load"
  },

  "/test": {
    target: TestTarget,
    "/": "load"
  },

  "/*": {
    target: Errors,
    "/*": "notFound"
  }
})

Aviator.dispatch()
