import _ from 'lodash'
import React, {Component} from 'react'

export default class StockSearchBar extends Component {
  constructor(props) {
    super(props);
  }

  onInputChange(value) {
    this.props.onSearchTermChange(value)
  }

  render() {
    return (
      <div id='stock-lookup' className='stock-lookup'>
        <h3>Search for Stocks</h3>
        <form id='stock-lookup-form'>
          <div className='row no-padding'>
            <div className='col-md-12'>
              <input
                type='text'
                placeholder='Stock ticker symbol'
                autoFocus='true'
                className='search-box input-lg'
                value= { this.props.searchBarValue }
                onChange={ event => this.onInputChange(event.target.value) }/>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
