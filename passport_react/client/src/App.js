import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { Header, Dashboard, Landing } from './components';

window.axios = axios;

class App extends Component {
  constructor() {
    super();

    this.state = {
      is_register: false,
      logged_in: false,
      email: '',
      password: '',
      confirm: '',
      // loading: true,
      user: {}
    }
  }

  authenticate = (e) => {
    e.preventDefault();

    let url = this.state.is_register ? '/auth/register' : '/auth/login';

    axios.post(url, {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      if ( res.data.success ) 
        this.setState({ user: { ...res.data.info }, logged_in: true})

        // this.setState({
        //   logged_in: true
        // })
    }).catch(err => console.log(err));
  }

  handleChange = (e) => {
    let prop = e.target.name;

    this.setState({ [prop]: e.target.value });
  }

  toggleType = (e) => {
    e.preventDefault();
    this.setState({
      is_register: !this.state.is_register
    })
  }

  isAuthenticated() {
    axios.get('/auth/authenticated')
      .then(({data}) => {
        if ( data.user ) {
          this.setState({
            user: data.user,
            logged_in: true
          });
        }
      });
  }

  componentWillMount() {
    this.isAuthenticated();
  }

  render() {
    return (
      <div>
        <Header logged_in={this.state.logged_in} email={this.state.user.email} />

        <Route path="/" exact render={props => (
          !this.state.logged_in ?
            <Landing
              logged_in={this.state.logged_in}
              authenticate={this.authenticate}
              is_register={this.state.is_register}
              email={this.state.email}
              password={this.state.password}
              confirm={this.state.confirm}
              handleChange={this.handleChange}
              toggleType={this.toggleType} />
          : <Dashboard />
        )} />
      </div>
    );
  }
}

export default App;
