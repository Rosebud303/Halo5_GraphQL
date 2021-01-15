import { Helmet } from 'react-helmet';
import React from 'react'

export const MetadataHelmet = (props) => {
  return (
    <Helmet>
      <title>
        {props.title}
      </title>

    </Helmet>
  )
}
