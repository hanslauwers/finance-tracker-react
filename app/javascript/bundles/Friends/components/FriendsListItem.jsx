import React, { Component } from 'react'

export default class FriendsListItem extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return (
      <tr key={ this.props.friend.id }>
        <td>{ this.props.friend.full_name }</td>
        <td>{ this.props.friend.email }</td>
        <td><a href={ 'users/' + this.props.friend.id } className='btn btn-xs btn-primary view-profile-btn'>View profile</a>
            <a onClick={ () => this.props.onRemoveFriend(this.props.friend) } className='btn btn-xs btn-danger rm-friend-btn'>Remove friend</a>
        </td>
      </tr>
    )
  }
}