import _ from 'lodash'
import React, {Component} from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  onInputChange(value) {
    this.props.onSearchTermChange(value)
  }

  render() {
    return (
      <div id={this.props.objectKeyword + '-lookup'} className={this.props.objectKeyword + '-lookup'}>
        <h3>{this.props.title}</h3>
        <form id={this.props.objectKeyword + '-lookup-form'}>
          <div className='row no-padding'>
            <div className='col-md-12'>
              <input
                type='text'
                placeholder={this.props.placeholder}
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
