import { loader } from "mini-css-extract-plugin"

export function filter(DATA, event, name) {

  const filerObj = {
    [name]: event
  }

  console.log(filerObj)
}