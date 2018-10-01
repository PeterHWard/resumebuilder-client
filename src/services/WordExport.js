//@flow

import { saveAs } from "file-saver/FileSaver"

const exportHTML = (name: string, htmlFragment: string, style?: string) => {
  const document = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>${name}</title>
      <style>${style || ""}</style>
    </head>
    <body>
      ${htmlFragment}
    </body>
  </html>`

  const blob = new Blob([document], {type: "application/msword;charset=utf-8"});
  saveAs(blob, name + ".doc")
}

export default exportHTML

