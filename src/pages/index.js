import '../utils/welcomelog'

import React from 'react'
import Layout from '../templates/layout'
import CanvasWrapper from '../components/CanvasWrapper'
import Overview from '../components/Overview'

export default () => {
  return (
    <Layout>
      <CanvasWrapper />
      <Overview />
    </Layout>
  )
}
