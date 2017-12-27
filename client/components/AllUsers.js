import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch(event) {
    this.setState({ search: event.target.value })
  }

  render () {
    let filteredUsers = this.props.allUsers.filter(user => {
      return user.fullName.indexOf(this.state.search) !== -1;
    })
    return (
      <div>
        <img src="http://dnd.wizards.com/sites/default/files/media/styles/second_hubpage_banner/public/images/head-banner/03_NEW-TO-DnD_Races_Heroes_Hero_140725.jpg?itok=Lv71J5AL" />
        <h2>Meet the Community</h2>
        Search by name:
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
          name="Search" />
        <br />
        <br />
        {
          filteredUsers.map(singleUser =>
            <div>
            <Link
              key={singleUser.id}
              to={`/users/${singleUser.id}`}>
            {singleUser.fullName}
            </Link><br />
            {singleUser.bio}
            <br />
            <br />
            </div>)
          }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    allUsers: state.allUsers.filter(user => user.id !== state.user.id)
  }
}


export default connect(mapState)(AllUsers)
