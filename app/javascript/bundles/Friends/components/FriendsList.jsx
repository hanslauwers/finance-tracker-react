import React, { Component } from 'react'

export default class FriendsList extends Component {
  constructor(props) {
    super(props)
  }

  renderFriendsList(){
    let result = _.map(this.props.friends,
      (friend) => {
        return (
          <tr key={ friend.id }>
            <td>{ friend.full_name }</td>
            <td>{ friend.email }</td>
            <td><a href={ 'users/' + friend.id } className='btn btn-xs btn-primary view-profile-btn'>View profile</a>
                <a onClick={ () => this.props.onRemoveFriend(friend) } className='btn btn-xs btn-danger rm-friend-btn'>Remove friend</a>
            </td>
          </tr>
        )
      })
    return result
  }

  render() {
    if(!_.isEmpty(this.props.friends)) {
      return (
        <table className="table table-striped">
          <thead>
            <tr>
              <th colSpan="3" className="page-header">
                <h2>My Friends</h2>
              </th>
            </tr>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.renderFriendsList() }
          </tbody>
        </table>
      )
    } else {
      return (
        <div className="row col-lg-12">
          <p className="lead">
            You don't have any friends yet. Add some!
          </p>
        </div>
      )
    }
  }
}