import React from 'react'

const page = ({params}: any) => {
  return (
    <div>{params.profileId}</div>
  )
}

export default page