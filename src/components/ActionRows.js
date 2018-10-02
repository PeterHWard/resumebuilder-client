// @flow
import React from "react"
import { func } from "prop-types";


export type ActionRowsAction = 
    "move-up" 
  | "move-down" 
  | "insert" 
  | "delete"
  | "edit"


const DEFAULT_OPTIONS = [
  {
    label: "Edit",
    value: "edit"
  },
  {
    label: "Move Up",
    value: "move-up"
  },
  {
    label: "Move Down",
    value: "move-down"
  },
  {
    label: "Insert",
    value: "insert"
  },
  {
    label: "Delete",
    value: "delete"
  }
]


type ActionRowsArgs<R> = {
  rows: R[],
  onChange: R[] => void,
  emptyRow: (number) => R,
  onEdit?: (number) => void,
  options?: {label: string, value: ActionRowsAction}[]
}

/**
 * Abstraction over logic controlling an editable list of things in a React component.  
 * 
 * Internally handles:
 *   - New row insertion (inserts below)
 *   - Row deletion
 *   - Row value update
 * 
 * Notifies client component if user wants to edit value. In this case client
 * is responsible for calling `update()` method with any changes.
 * 
 * Optional `options` prop allows for custom mapping of menu text to 
 * `ActionRowsAction`s.
 * 
 * Usage: intended for use within render() method/function of component. 
 * Components should not inherit from `ActionRows` class.
 */
export class ActionRows<R> {
  rows: R[]
  onChange: R[] => void
  emptyRow: (number) => R
  onEdit: (number) => void
  options: {label: string, value: ActionRowsAction}[]

  constructor(args: ActionRowsArgs<R>) {
    this.rows = args.rows
    this.onChange = args.onChange
    this.emptyRow = args.emptyRow
    this.onEdit = args.onEdit || function () {}
    this.options = args.options || DEFAULT_OPTIONS
  }

  handleEdit = (idx: number) => {
    this.onEdit(idx)
  }

  update = (idx: number) => (nextRow: R) => {
    const nextRows = [... this.rows]
    nextRows[idx] = nextRow
    this.onChange(nextRows)
  }

  handleMove = (direction: "up" | "down", idx: number) => {
    const rows = this.rows
    if (direction === "up") {
      if (idx === 0 || rows.length < 2) return
      const nextRows = [... rows]
      nextRows[idx] = rows[idx - 1]
      nextRows[idx - 1] = rows[idx]
      this.onChange(nextRows)
    } 
    else {
      if (rows.length < 2 || idx === rows.length - 1) return
      const nextRows = [... rows]
      nextRows[idx] = rows[idx + 1]
      nextRows[idx + 1] = rows[idx]
      this.onChange(nextRows)
    }
  }

  handleInsert = (idx: number) => {
    const rows = this.rows
    this.onChange([].concat(
      rows.slice(0, idx + 1), 
      this.emptyRow(idx + 1), 
      rows.slice(idx + 1)))
  }

  handleDelete = (idx: number) => {
    const nextRows = [... this.rows]
    nextRows.splice(idx, 1)
    this.onChange(nextRows)
  }

  handleAction = (idx: number) => (action: ActionRowsAction) => {
    switch (action) {
      case "edit":
        this.handleEdit(idx)
        break
      case "insert":
        this.handleInsert(idx)
        break
      case "delete":
        if (window.confirm("Are you sure?"))
          this.handleDelete(idx)
        break 
      case "move-up":
        this.handleMove("up", idx)
        break 
      case "move-down":
        this.handleMove("down", idx)
        break
      default:
        throw new Error("Invalid action: " + action)
    } 
  }
}

export default ActionRows