import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import StockSearchBar from './StockSearchBar'
import StockSearchResult from './StockSearchResult'

class SearchStocks extends Component {
  constructor(props) {
    super(props);
    this.state = { stock: {} }
    this.onSearchTermChange = this.onSearchTermChange.bind(this)
  }

  onSearchTermChange(value) {
    const url = '/search_stocks.json?stock=' + value + '&current_user_id=' + this.props.current_user_id
    fetch(url)
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ stock: data }) });
  }

  render() {
    return (
      <div>
        <StockSearchBar onSearchTermChange={this.onSearchTermChange} />
        <StockSearchResult stock={this.state.stock} user_id={this.props.current_user_id} />
      </div>
    );
  }
}

export default SearchStocks;