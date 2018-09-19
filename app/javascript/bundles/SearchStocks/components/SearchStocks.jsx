import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import StockSearchBar from './StockSearchBar'
import StockSearchResult from './StockSearchResult'
import StocksList from './StocksList'

class SearchStocks extends Component {
  constructor(props) {
    super(props);

    this.state = { stock: {}, my_stocks: [], search_bar_value: '', user : this.props.location.state.user }

    this.onSearchTermChange = this.onSearchTermChange.bind(this)
    this.addStock = this.addStock.bind(this)
    this.deleteStock = this.deleteStock.bind(this)
    this.handleAddedStock = this.handleAddedStock.bind(this)
  }

  onSearchTermChange(value) {
    this.setState({ search_bar_value: value })
    const url = '/api/v1/search_stocks?stock=' + value + '&user_id=' + this.state.user.id
    fetch(url, {
        method: "GET",
        headers:{
          'Authorization': localStorage.getItem('TrackerAuthToken')
        }})
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ stock: data }) })
  }

  handleAddedStock(response) {
    this.setState( { my_stocks: [...this.state.my_stocks, response],
                     search_bar_value: '',
                     stock: {} })
  }

  addStock(stock) {
    const data = {
      stock_ticker: stock.ticker,
      stock_id: stock.id,
      user_email: this.state.user.email
    }
    const url = '/api/v1/add_stock'
    return fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('TrackerAuthToken')
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.handleAddedStock(response))
  }

  handleDeletedStock(response) {
    this.setState({ my_stocks: _.filter(this.state.my_stocks, (stock) => stock.id != response.id) })
  }

  deleteStock(user_stock) {
    const url = '/api/v1/delete_stock'
    const data = {
      stock_id: user_stock.id,
      user_id: this.state.user.id
    }
    return fetch(url, {
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('TrackerAuthToken')
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => this.handleDeletedStock(response))
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ 'user' : this.props.location.state.user })
  }

  componentDidMount = () => {
    const url = '/api/v1/my_stocks?user_id=' + this.state.user.id
    fetch(url, {
        method: "GET",
        headers:{
          'Authorization': localStorage.getItem('TrackerAuthToken')
        }})
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ my_stocks: data }) })
  }

  render() {
    return (
      <div>
        <StockSearchBar onSearchTermChange={this.onSearchTermChange}
                        searchBarValue={this.state.search_bar_value} />
        <StockSearchResult stock={this.state.stock}
                           user_id={this.state.user.id}
                           onAddStock={this.addStock} />
        <StocksList current_user_id={ this.state.user.id }
                    user_id={ this.state.user.id }
                    my_stocks={ this.state.my_stocks }
                    onDeleteStock={ this.deleteStock } />
      </div>
    );
  }
}

export default SearchStocks;