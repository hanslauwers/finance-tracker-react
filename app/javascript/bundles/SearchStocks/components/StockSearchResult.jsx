import _ from 'lodash'
import React, {Component} from 'react'

export default class StockSearchResult extends Component {
  constructor(props) {
    super(props);
  }

  addStockButton() {
    if(this.props.stock.can_add_stock) {
      return (
        <a onClick={() => this.props.onAddStock(this.props.stock)}  
               className='btn btn-xs btn-success add-to-stocks-btn'>Add this stock</a>
      )
    } else {
      let message = ''
        if(!this.props.stock.under_stock_limit)
          message += 'Stock cannot be added because you have already added 10 stocks'
        else if(this.props.stock.stock_already_added)
          message += 'Stock cannot be added because you have already added this stock'
      return(
        <span className="label label-default">
          { message }
        </span>
      )
    }
  }

  render(){
    if(!_.isEmpty(this.props.stock)) {
      return (
        <div>
          <div id="stock-lookup-results" className="well results-block">
            <strong>Symbol: </strong> { this.props.stock.ticker }
            <strong>Name: </strong> { this.props.stock.name }
            <strong>Price: </strong> { this.props.stock.last_price }
          </div>
          <div>
            { this.addStockButton() }
          </div>
        </div>
      )
    }
    return null
  }
}