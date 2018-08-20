import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import StockSearchBar from './StockSearchBar'
import StockSearchResult from './StockSearchResult'
import StocksList from './StocksList'

class SearchStocks extends Component {
  constructor(props) {
    super(props);

    this.state = { stock: {}, user_stocks: this.props.user_stocks, search_bar_value: '' }

    this.onSearchTermChange = this.onSearchTermChange.bind(this)
    this.addStock = this.addStock.bind(this)
    this.deleteStock = this.deleteStock.bind(this)
    this.handleAddedStock = this.handleAddedStock.bind(this)
  }

  onSearchTermChange(value) {
    this.setState({ search_bar_value: value })
    const url = '/search_stocks.json?stock=' + value + '&current_user_id=' + this.props.current_user_id
    fetch(url)
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ stock: data }) })
  }

  handleAddedStock(response) {
    this.setState( { user_stocks: [...this.state.user_stocks, response],
                     search_bar_value: '',
                     stock: {} })
  }

  addStock(stock) {
    const data = {
      user_id: this.props.user_id,
      stock_ticker: stock.ticker,
      stock_id: stock.id
    }
    const url = '/add_stock.json'
    return fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.handleAddedStock(response))
  }

  handleDeletedStock(response) {
    this.setState({ user_stocks: _.filter(this.state.user_stocks, (stock) => stock.id != response.id) })
  }

  deleteStock(user_stock) {
    const url = '/delete_stock'
    const data = {
      stock_id: user_stock.id,
      user_id: this.props.current_user_id
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
    .then(response => this.handleDeletedStock(response))
  }

  render() {
    return (
      <div>
        <StockSearchBar onSearchTermChange={this.onSearchTermChange}
                        searchBarValue={this.state.search_bar_value} />
        <StockSearchResult stock={this.state.stock}
                           user_id={this.props.current_user_id}
                           onAddStock={this.addStock} />
        <StocksList current_user_id={ this.props.current_user_id }
                    user_id={ this.props.user_id }
                    user_stocks={ this.state.user_stocks }
                    onDeleteStock={ this.deleteStock } />
      </div>
    );
  }
}

export default SearchStocks;