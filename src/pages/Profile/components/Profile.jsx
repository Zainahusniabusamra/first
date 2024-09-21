import React from 'react'
import { useParams } from 'react-router-dom'

export default function profile() {

const {id}= useParams();

  return (

    <div>profile{id}</div>
  )
}
