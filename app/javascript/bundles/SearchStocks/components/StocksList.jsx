import _ from 'lodash'
import React, { Component } from 'react'

export default class StocksList extends Component {
  constructor(props) {
    super(props)
  }

  userStockLinks(user_stock) {
    if(this.props.user_id == this.props.current_user_id) {
      return (
        <div className="col-md-3">
          <a onClick={(user_stock) => this.deleteStock(user_stock)}
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

  deleteStock(user_stock) {
    alert(user_stock.name + " must be deleted")
  }

  userStocksList() {
    let result = _.map(this.props.user_stocks, 
      user_stock =>
        <div className="stock-table-data col-md-12 panel panel-default">
          <div className="stock-data row">
            <div className="col-md-3"><strong>{ user_stock.name }</strong></div>
            <div className="col-md-3"><strong>{ user_stock.ticker }</strong></div>
            <div className="col-md-3"><strong>{ user_stock.price }</strong></div>
            { this.userStockLinks(user_stock) }
          </div>
        </div>
    );
    return result;
  }

  render() {
    return (
      <div className="stock-table-container">
        <div className="stock-table-header row">
          <div className="col-md-12">
            <span className="stock-table-title col-md-3"><h4>Name</h4></span>
            <span className="stock-table-title col-md-3"><h4>Symbol</h4></span>
            <span className="stock-table-title col-md-3"><h4>Current price</h4></span>
            <span className="stock-table-title col-md-3"><h4>Actions</h4></span>
          </div>
        </div>
        <div className="stock-table-data-container">
          { this.userStocksList() }
        </div>
      </div>
    )
  }
}
