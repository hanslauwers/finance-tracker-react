import React, { Component } from 'react'

import FriendsListItem from './FriendsListItem'

export default class FriendsList extends Component {
  constructor(props) {
    super(props)
  }

  renderFriendsList(){
    let result = _.map(this.props.friends,
      friend => 
        <FriendsListItem key={ friend.id }
                         friend={ friend }
                         onRemoveFriend={ this.props.onRemoveFriend } />
      );
    return result;
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