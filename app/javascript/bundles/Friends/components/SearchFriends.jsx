import React, {Component} from 'react'

import SearchBar from '../../Shared/components/SearchBar'
import FriendsSearchResult from './FriendsSearchResult'
import FriendsList from './FriendsList'

export default class SearchFriends extends Component {
  constructor(props) {
    super(props)

    this.state = { search_bar_value: '', users: [], friends: this.props.friends }

    this.onSearchTermChange = this.onSearchTermChange.bind(this)
    this.onAddFriend = this.onAddFriend.bind(this)
    this.onRemoveFriend = this.onRemoveFriend.bind(this)
  }

  onSearchTermChange(value) {
    this.setState({ search_bar_value: value })
    const url = '/api/v1/search_friends?search_param=' + value + 
                                      '&user_email=' + this.props.current_user.email + 
                                      '&user_token=' + this.props.current_user.authentication_token
    fetch(url)
      .then((response) => {return response.json()})
      .then((data) => { this.setState({ 'users': data }) })
  }

  onAddFriend(user) {
    const data = {
      friend: user.id,
      user_email: this.props.current_user.email,
      user_token: this.props.current_user.authentication_token
    }
    const url = '/api/v1/add_friend'
    return fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.handleAddedFriend(user, response))
    console.log('Add Friend', user)
  }

  handleAddedFriend(response) {
    this.setState({ friends: [...this.state.friends, response] })
  }

  handleDeletedFriend(response) {
    this.setState({ friends: _.filter(this.state.friends, (friend) => friend.id != response.id) })
  }

  onRemoveFriend(friend) {
    const url = '/api/v1/delete_friend'
    const data = {
      friend: friend.id,
      user_email: this.props.current_user.email,
      user_token: this.props.current_user.authentication_token
    }
    return fetch(url, {
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.handleDeletedFriend(response))
  }

  render(){
    return (
      <div>
        <SearchBar onSearchTermChange={this.onSearchTermChange}
                   searchBarValue={this.state.search_bar_value}
                   objectKeyword='friend'
                   placeholder='Search for friends'
                   title='Search for Friends' />
        <FriendsSearchResult users={this.state.users}
                             onAddFriend={this.onAddFriend}
                             searchBarValue={this.state.search_bar_value}
                             friendids={_.map(this.state.friends, friend => { return friend.id })} />
        <FriendsList friends={this.state.friends}
                     onRemoveFriend={this.onRemoveFriend} />
      </div>
    )
  }
}