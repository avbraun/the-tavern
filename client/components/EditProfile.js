import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {updateUser} from '../store'
import history from '../history'

class EditProfile extends React.Component {
  constructor(props){
    super(props);
    let userId = Number(props.user.id);
    this.state = {
      id: userId,
      fullName: props.user.fullName,
      bio: props.user.bio,
      proudestMoment: props.user.proudestMoment
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  render () {
    return (
      <div>
      <img src="http://dnd.wizards.com/sites/default/files/media/styles/story_banner/public/images/head-banner/Article_SwordCoastAdventurerersGuide_Sub-Header.jpg?itok=i-IayJIi" />
      <h3>Edit My Profile</h3>
      <form onChange={this.handleUpdate} onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="fullName" defaultValue={this.props.user.fullName} />
        </label>
        <br />
        <label>
          Bio:
          <input type="text" name="bio" defaultValue={this.props.user.bio} />
        </label>
        <br />
        <label>
          Proudest DnD Moment:
          <input type="text" name="proudestMoment" defaultValue={this.props.user.proudestMoment} />
        </label>
        <br />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
      </div>
    )
  }

  handleUpdate(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProfile(this.state);
    history.goBack();
  }
}


const mapState = (state) => {
  return {
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateProfile: (profile) => dispatch(updateUser(profile))
  }
}

export default withRouter(connect(mapState, mapDispatch)(EditProfile))
