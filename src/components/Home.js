import React from "react"
import Note from "./Note"

export default function Home(props) {
  const {showAlert} = props;
  return (
    <div>
      <Note showAlert={showAlert}/>
    </div>
  )
}
