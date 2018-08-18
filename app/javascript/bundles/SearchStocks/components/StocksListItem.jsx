import React, { Component } from 'react'

export default class StocksListItem extends Component {
  render() {
    return (
      <div className="stock-table-data col-md-12 panel panel-default">
        <div className="stock-data row">
          <div className="col-md-3"><strong>{ this.props.user_stock.name }</strong></div>
          <div className="col-md-3"><strong>{ this.props.user_stock.ticker }</strong></div>
          <div className="col-md-3"><strong>{ this.props.user_stock.last_price }</strong></div>
          { this.userStockLinks(this.props.user_stock) }
        </div>
      </div>
    )
  }

  userStockLinks(user_stock) {
    if(this.props.user_id == this.props.current_user_id) {
      return (
        <div className="col-md-3">
          <a onClick={ () => this.props.onDeleteStock(user_stock) }
             className="btn btn-xs btn-danger delete-stock-btn">
            Delete
          </a>
          <a className='btn btn-xs btn-success news-for-stock-btn'>News for Stock</a>
        </div>
      )
    }
    return (
      <div className="col-md-3">
        <a className='btn btn-xs btn-success news-for-stock-btn'>
          News for Stock
        </a>
      </div>
    )
  }

  

}