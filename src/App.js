import React, {Component} from 'react';
import strava from './strava.svg';
import './App.css';
import {STRAVA_REDIRECT_URL, auth, getStats} from './services/strava';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

let code;
let accessToken;
let athlete;

class Home extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={strava} className="App-logo" alt="logo" />
          <a className="App-link" href={STRAVA_REDIRECT_URL}>
            Login to Strava
          </a>
        </header>
      </div>
    );
  }
}

class AuthenticationCallback extends Component {
  state = {
    authenticated: false,
  };

  async componentDidMount () {
    code = new URLSearchParams (this.props.location.search).get ('code');

    const result = await auth (code);

    if (result['access_token'] && result.athlete) {
      accessToken = result['access_token'];
      athlete = result.athlete;
    }
    this.setState ({authenticated: true});
  }

  render () {
    return this.state.authenticated
      ? <Redirect
          to={{
            pathname: '/stats',
            state: {from: this.props.location},
          }}
        />
      : <div><p>Authentication busy...</p></div>;
  }
}

class BasicStats extends Component {
  state = {
    basicStats: null
  }

  async componentDidMount() {
    const basicStats = await getStats(accessToken);
    this.setState({basicStats})
  }

  render() {
    if (!this.state.basicStats) {
      return <div>Loading...</div>
    }
    return <div><p>{JSON.stringify(this.state.basicStats)}</p></div>
  }
}

const Stats = ({location}) =>
  athlete
    ? <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <p>{JSON.stringify (athlete)}</p>
        <h1>
          <span role="img" aria-label="Hello">👋</span>
          {' '}
          {athlete.firstname}
          {' '}
          {athlete.lastname}
        </h1>
        <img src={athlete.profile} alt={athlete.username} />
        <h2>Here are your basic stats</h2>
        <BasicStats />
      </div>
    : <Redirect
        to={{
          pathname: '/',
          state: {from: location},
        }}
      />;

function BasicExample () {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/stats">Stats</Link>
          </li>
          <li>
            <a href={STRAVA_REDIRECT_URL}>Login</a>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/tokenresponse" component={AuthenticationCallback} />
        <Route path="/stats" component={Stats} />
      </div>
    </Router>
  );
}

export default BasicExample;
