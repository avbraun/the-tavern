import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, Campaign, Character, ProfilePage, AllCampaigns, AccountPage, CreateCampaign, CreateCharacter, AllUsers, AllCharacters, EditProfile, EditCampaign, EditCharacter } from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/" component={UserHome} />
                  <Route exact path="/home" component={UserHome} />
                  <Route exact path="/campaigns/all" component={AllCampaigns} />
                  <Route exact path="/account/user/:campaignId" component={AccountPage} />
                  <Route exact path="/campaigns/new" component={CreateCampaign} />
                  <Route exact path="/campaigns/:campaignId" component={Campaign} />
                  <Route exact path="/campaigns/:campaignId/edit" component={EditCampaign} />
                  <Route exact path="/users/all" component={AllUsers} />
                  <Route exact path="/users/:userId" render={(props) => <ProfilePage id={props.match.params.userId} />} />
                  <Route exact path="/users/:userId/edit" component={EditProfile} />
                  <Route exact path="/characters/new/:campaignId" component={CreateCharacter} />
                  <Route exact path="/characters/new" component={CreateCharacter} />
                  <Route exact path="/characters/all" component={AllCharacters} />
                  <Route exact path="/characters/:characterId" component={Character} />
                  <Route exact path="/characters/:characterId/edit" component={EditCharacter} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
