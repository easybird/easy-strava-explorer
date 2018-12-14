import React from 'react';
import womanRunning from '../../assets/woman-run.jpg';
import {Row } from 'antd';
import { LoginView, LoginButton } from './LoginButton';

export const PublicIntro = () => [
    <Row key="tryout" className="Home-paragraph">
      <h2>Want to give it a try?</h2>
      <div>
        <img
          style={{
            width: '100vw',
            height: '50vh',
            objectFit: 'cover',
            objectPosition: '45% 30%',
          }}
          src={womanRunning}
          alt="woman running"
        />
        <div
          className="Home-tryout"
          style={{
            position: 'absolute',
            width: '40%',
            minWidth: '200px',
            left: '10%',
            top: '20%',
          }}
        >

            <LoginButton />

        </div>
      </div>
    </Row>,
    <Row key="investigation" className="Home-paragraph">
      <h2>What will we investigate?</h2>
      <h4>We will combine your heart rate and your average speed.</h4>
      <blockquote>
        The lower your heart rate is at a certain speed, the better your stamina
        is.
      </blockquote>
      <p>
        Once you're logged in, this app bundles the data of your runs, mixes your
        stats and does some useful calculations with it. We will present you with
        some smart charts to give you a good idea of how well you are doing.
      </p>
      <LoginView />
      <Row key="whyLogin" className="Home-paragraph">
      <h2>Why do you need to log in to Strava?</h2>
      <p>
        To give you some useful insights, we need the combine the data from your
        runs, like speed, distance and altitude. Don't worry, this is free off
        charge, conform{' '}
        <a href="https://developers.strava.com/guidelines/" rel="noopener noreferrer" target="_blank">
          the Strava API guidelines
        </a>
        , and we do not store your data. I created this app, purely out of my own
        interest.
      </p>
      </Row>
      <Row key="No Holy grail" className="Home-paragraph">
      <h2>Detailed analysis</h2>
      <p>
        This is no holy grail. Your heart rate is also influenced by the
        circumstances of the track you're running. Are you running at high
        altitude? Running through the sand? Running long distances at a fast pace?
      </p>
      <p>
        We will indicate the runs from which we think they should probably be left
        out of the equasion. You will also be able to manually disable runs that
        are maybe messing with your graph.
      </p>
      </Row>
    </Row>,
  ]