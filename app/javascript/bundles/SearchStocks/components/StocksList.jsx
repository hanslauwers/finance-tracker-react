import _ from 'lodash'
import React, { Component } from 'react'

import StocksListItem from './StocksListItem'

export default class StocksList extends Component {
  constructor(props) {
    super(props)
  }

  myStocksList() {
    let result = _.map(this.props.my_stocks, 
      my_stock =>
          <StocksListItem my_stock={ my_stock }
                          current_user_id={ this.props.current_user_id }
                          user_id={ this.props.user_id }
                          onDeleteStock={ this.props.onDeleteStock }
                          key={ my_stock.ticker }  />
    );
    return result;
  }

  render() {
    return (
      <div className="stock-table-container">
        <div className="stock-table-header row">
          <div className="col-md-12">
            <div className="stock-table-title col-md-3"><h4>Name</h4></div>
            <div className="stock-table-title col-md-3"><h4>Symbol</h4></div>
            <div className="stock-table-title col-md-3"><h4>Current price</h4></div>
            <div className="stock-table-title col-md-3"><h4>Actions</h4></div>
          </div>
        </div>
        <div className="stock-table-data-container">
          { this.myStocksList() }
        </div>
      </div>
    )
  }
}
