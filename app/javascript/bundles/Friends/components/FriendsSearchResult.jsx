import React, { Component } from 'react'

export default class FriendsSearchResult extends Component {
  constructor(props) {
    super(props)
  }

  renderUsers(users) {
    let result = _.map(users, 
      user => {
        return (
          <tr key={user.id}>
            <td><strong>Name: </strong> { user.full_name }</td>
            <td><strong>Email: </strong> { user.email }</td>
            <td>
              <strong>Profile: </strong>
              <a href={'/users/' + user.id}
                className='btn btn-xs btn-primary view-profile-btn'>
                  View profile
              </a>
              { this.renderUserLink(user) }
            </td>
          </tr>
        )
      }
    );
    return result;
  }

  renderUserLink(user) {
    if(!this.props.friendids.includes(user.id)) {
      return (
        <a onClick={() => this.props.onAddFriend(user)} className='btn btn-xs btn-success add-friend-btn'>Add as friend</a>
      )
    } else {
      return (
          <span className="label label-primary">
            You are friends
          </span>
      )
    }
  }

  render() {
    if(!_.isEmpty(this.props.users)) {
      return (
        <div id="friend-lookup-results" className="well results-block col-md-10">
          <table className="search-results-table col-md-12">
            <tbody>
              { this.renderUsers(this.props.users) }
            </tbody>
          </table>
        </div>
      )
    }
    else if(this.props.searchBarValue !== '') {
      return (
        <p className="lead col-md-12">
          No people match these search criteria.
        </p>
      )
    }
    else {
      return null
    }
  }
}