import React, {Component} from 'react';
import strava from './strava.svg';
import './App.css';
import {STRAVA_REDIRECT_URL, auth} from './services/strava';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import useLogin from './hooks/useLogin';
import BasicStats from './components/BasicStats';

const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
const LOCAL_STORAGE_ATHLETE = 'athlete';

let code;

const Home = ({location}) => {
  const {isLoggedIn} = useLogin ();

  if (isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/stats',
          state: {from: location},
        }}
      />
    );
  }

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
};

class AuthenticationCallback extends Component {
  state = {
    authenticated: false,
  };

  async componentDidMount () {
    code = new URLSearchParams (this.props.location.search).get ('code');

    const result = await auth (code);

    if (result['access_token'] && result.athlete) {
      localStorage.setItem (LOCAL_STORAGE_ACCESS_TOKEN, result['access_token']);
      localStorage.setItem (
        LOCAL_STORAGE_ATHLETE,
        JSON.stringify (result.athlete)
      );
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

const Stats = ({location}) => {
  const {isLoggedIn, athlete, accessToken} = useLogin ();

  if (typeof isLoggedIn === 'undefined') {
    return <div>Fetching from localStorage...</div>;
  }

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {from: location},
        }}
      />
    );
  }

  return (
    <div
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
      <h2>HR-RS Index</h2>
      <h4>The index reflexes the pace independent running performance, where a decrease means a performance increase.</h4>
      <BasicStats accessToken={accessToken} />
    </div>
  );
};

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
