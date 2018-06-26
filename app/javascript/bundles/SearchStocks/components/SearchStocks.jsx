import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchStocks extends Component {
  constructor(props) {
    super(props);

    this.state = { textvalue: '' };
  }

  onInputChange(value){
    this.setState({textvalue: value});
    console.log(value);
  }

  render() {
    return (
      <div id="stock-lookup">
        <h3>Search for Stocks</h3>
        <form id="stock-lookup-form">
          <div className="row no-padding text-center col-md-12">
            <div className="col-md-12">
              <input  type="text"
                      placeholder="Stock ticker symbol"
                      autoFocus="true"
                      className="search-box input-lg"
                      value={ this.state.textvalue } 
                      onChange={ event => this.onInputChange(event.target.value) }/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchStocks;