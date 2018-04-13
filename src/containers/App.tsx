import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

import { State } from '../types'
import './App.css'
import Home from './Home'
import Login from './Login'
import Header from './Header'
import ResetOrgs from '../components/resetOrgs'


// tslint:disable-next-line:no-any
const userIsAuthenticated = connectedRouterRedirect<any, State>({
  // The url to redirect user to if they fail
  redirectPath: '/login',
  // Determine if the user is authenticated or not
  authenticatedSelector: state => state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsAuthenticated'
})

const locationHelper = locationHelperBuilder({})
// tslint:disable-next-line:no-any
const userIsNotAuthenticated = connectedRouterRedirect<any, State>({
  // This sends the user either to the query param route if we have one, or to the landing page if none is specified and the user is already logged in
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  // This prevents us from adding the query parameter when we send the user away from the login page
  allowRedirectBack: false,
  // This prevents us from adding the query parameter when we send the user away from the login page
  // Determine if the user is authenticated or not
  authenticatedSelector: state => !state.user.isLoggedIn,
  // A nice display name for this check
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

const ProtectedHome = userIsAuthenticated(Home)
const RedirectedLogin = userIsNotAuthenticated(Login)
const ProtectedResetOrgs = userIsAuthenticated(ResetOrgs)

class Component extends React.Component<Props, {}> {
  render() {
    return (
      <Router>
        <div className="app">
          <Header user={this.props.user} />
          <div className="app_content">
            <Route path="/" exact={true} component={ProtectedHome} />
            <Route path="/reset-orgs" exact={true} component={ProtectedResetOrgs} />
            <Route path="/login" component={RedirectedLogin} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => {
  return bindActionCreators({}, dispatch)
}
const mapStateToProps = (state: State) => {
  return {
    user: state.user
  }
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Component);
