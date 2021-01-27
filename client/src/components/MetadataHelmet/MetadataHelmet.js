import { Helmet } from 'react-helmet';
import React from 'react'

export const MetadataHelmet = (props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta property="og:title" content="How to Become an SEO Expert (8 Steps)" />
      <meta property="og:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
      <meta property="og:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
      <meta property="twitter:title:" content="How to Become an SEO Expert (8 Steps)" />
      <meta property="twitter:description" content="Get from SEO newbie to SEO pro in 8 simple steps." />
      <meta property="twitter:image" content="https://ahrefs.com/blog/wp-content/uploads/2019/12/fb-how-to-become-an-seo-expert.png" />
    </Helmet>
  )
}
