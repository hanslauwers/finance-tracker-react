import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    let authTokenVal = '';
    if(localStorage.getItem('TrackerAuthToken') !== null){
      authTokenVal = localStorage.getItem('TrackerAuthToken')
    }

    this.state = { 'email' : '', 'password' : '', 'redirect' : false, 'user' : {}, 'authToken' : authTokenVal }
  }

  signIn = () => {
    if(this.state.authToken !== '') {
      this.signInWithToken()
    }
    else if(this.state.email !== '' && this.state.password !== '') {
      this.signInWithPassword()
    }
  }

  signInWithToken = () => {
    const url = '/api/v1/sign_in'
    return fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          'Authorization': this.state.authToken
        } // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      localStorage.setItem('TrackerAuthToken', response["auth-token"])
      this.setState({ 'redirect' : true, 'user': response })
    })
  }

  signInWithPassword = () => {
    const data = { 'user' : { 'email': this.state.email, 'password': this.state.password  } }
    const url = '/api/v1/sign_in'
    return fetch(url, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      localStorage.setItem('TrackerAuthToken', response["auth-token"])
      this.setState({ 'redirect' : true, 'user': response })
    })
  }

  onEmailChange = (inputValue) => {
    this.setState({ 'email': inputValue});
  }

  onPasswordChange = (inputValue) => {
    this.setState({ 'password': inputValue})
  }

  onKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.signIn()
    }
  }

  componentDidMount = () => {
    this.signIn()
  }

  render() {
    if(this.state.redirect){
      return (<Redirect to={{
        pathname: '/search_stocks',
        state: { user: this.state.user }
      }} />)
    }
    return (
      <div className="panel-body">
        <div className="form-group">
          <label>Email</label>
          <input type="email"
                 id="user-email"
                 autoFocus="true"
                 className="form-control"
                 value={ this.state.email }
                 onChange={ (event) => this.onEmailChange(event.target.value) } />
        </div>
        <div className="form-group">
          <div className="form-group">
            <label>Password</label>
            <input autoComplete="off"
                   className="form-control"
                   type="password"
                   id="user-password"
                   value={ this.state.password }
                   onChange={ (event) => this.onPasswordChange(event.target.value) }
                   onKeyPress={ (event) => this.onKeyPress(event)} />
          </div>
          <a className="btn btn-primary" onClick={ this.signIn }>Sign in</a>
        </div>
      </div>
    );
  }
}