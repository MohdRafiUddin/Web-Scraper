import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'

const App = (props) => {
  const { fetchUser, fetchData } = props
  useEffect(() => {
    fetchUser()
    fetchData()
  }, [])

  return (
    <BrowserRouter>
      <React.StrictMode>
        <Header />
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
      </React.StrictMode>
    </BrowserRouter>
  )
}

export default connect(null, actions)(App)
