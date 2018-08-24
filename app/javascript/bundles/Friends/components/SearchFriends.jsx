import React, {Component} from 'react'

import SearchBar from '../../Shared/components/SearchBar'

export default class SearchFriends extends Component {
  constructor(props) {
    super(props)

    this.state = { search_bar_value: '' }

    this.onSearchTermChange = this.onSearchTermChange.bind(this)
  }

  onSearchTermChange(value) {
    this.setState({ search_bar_value: value })
    const url = '/api/v1/search_friends?search_param=' + value + 
                                      '&user_email=' + this.props.current_user.email + 
                                      '&user_token=' + this.props.current_user.authentication_token
    fetch(url)
      .then((response) => {return response.json()})
      .then((data) => {console.log(data) })
  }

  render(){
    return (
      <div>
        <SearchBar onSearchTermChange={this.onSearchTermChange}
                   searchBarValue={this.state.search_bar_value}
                   objectKeyword='friend'
                   placeholder='Search for friends' />
      </div>
    )
  }
}