import React, { useState } from 'react';
import {Row, Col, Avatar, Divider, List, Card, Icon} from 'antd';
import {round} from '../utils/conversions';

const MAX_EARTH_KM = 40075;
const BRUSSELS_MOSCOW = 2561;
const BRUSSELS_LISBOA = 2040;
const BRUSSELS_MADRID = 1574;
const BRUSSELS_LYON = 726;
const BRUSSELS_PARIS = 303;

const AthleteWelcome = ({athlete, userStats}) => {
  console.log ('---userStats', userStats, '\n');
  const [state, setState ] = useState({
    key: 'allTime'
  })

  const tabList = [{
    key: 'allTime',
    tab: 'All time',
  }, {
    key: 'thisYear',
    tab: 'This year',
  }];

  // TODO do something with the user his city ${athlete.city}...
  const getTotalDistanceSentence = (distance) => {
      const runToCities = ({distanceRan, exampleDistance, cities}) => `That's like running more then ${distanceRan % exampleDistance} ${distanceRan % exampleDistance < 2 ? "time" : "times"} from ${cities[0]}, all the way to ${cities[1]}!`
      switch(distance) {
          case distance > MAX_EARTH_KM:
           return  `That's like running more then ${distance % MAX_EARTH_KM} times around the earth!`;
           case distance > BRUSSELS_MOSCOW:
           return runToCities({distanceRan: distance, exampleDistance: BRUSSELS_MOSCOW, cities: ['Brussels', 'Moscow']});
           case distance > BRUSSELS_LISBOA:
           return runToCities({distanceRan: distance, exampleDistance: BRUSSELS_LISBOA, cities: ['Brussels', 'Lisboa']});
           case distance > BRUSSELS_MADRID:
           return runToCities({distanceRan: distance, exampleDistance: BRUSSELS_MADRID, cities: ['Brussels', 'Madrid']});
           case distance > BRUSSELS_LYON:
           return runToCities({distanceRan: distance, exampleDistance: BRUSSELS_LYON, cities: ['Brussels', 'Lyon']});
           case distance > BRUSSELS_PARIS:
           return runToCities({distanceRan: distance, exampleDistance: BRUSSELS_PARIS, cities: ['Brussels', 'Paris']});
           default:
           return `Thats like running ${distance} from ${athlete.city}, all the way to ...!`;
      }
  }


  const contentList = {
    allTime: userStats &&
        <div>
            <p>{JSON.stringify(userStats)}</p>
          <p>{`You ran ${userStats.all_run_totals.count} times since ${athlete.created_at}.
          After running for ${round (userStats.all_run_totals.moving_time / 60 / 60)} hours, you crossed ${round (userStats.all_run_totals.distance / 1000)} kilometres.
          ${getTotalDistanceSentence(round (userStats.all_run_totals.distance / 1000))} Keep up the good work!`}</p>
          <p>{`Total Strava runs: ${userStats.all_run_totals.count}`}</p>
          <p
          >{`Total Strava distance: ${round (userStats.all_run_totals.distance / 1000)} km`}</p>
          <p
          >{`Total Strava moving time: ${round (userStats.all_run_totals.moving_time / 60 / 60)} hours`}</p>
          <p
          >{`Average run distance: ${round (userStats.all_run_totals.distance / 1000 / userStats.all_run_totals.count)} km`}</p>
          <p
          >{`Average run moving time: ${round (userStats.all_run_totals.moving_time / 60 / 60 / userStats.all_run_totals.count)} hours`}</p>

        </div>,
    thisYear: userStats &&
        <div>
          <p>{`Total Strava runs: ${userStats.ytd_run_totals.count}`}</p>
          <p
          >{`Total Strava distance: ${round (userStats.ytd_run_totals.distance / 1000)} km`}</p>
          <p
          >{`Total Strava moving time: ${round (userStats.ytd_run_totals.moving_time / 60 / 60)} hours`}</p>
          <p
          >{`Average run distance: ${round (userStats.ytd_run_totals.distance / 1000 / userStats.ytd_run_totals.count)} km`}</p>
          <p
          >{`Average run moving time: ${round (userStats.ytd_run_totals.moving_time / 60 / 60 / userStats.ytd_run_totals.count)} hours`}</p>

        </div>,
  };


  return (
    <Card
      style={{width: '100%', maxWidth: "450px"}}
      title={`👋 ${athlete.firstname} ${athlete.lastname}, check your stats`}
      cover={
        <img
          src={athlete.profile}
          alt={athlete.username}
        />
      }
      actions={[<Icon type="right-square" />]}
      tabList={tabList}
      activeTabKey={state.key}
      onTabChange={key => setState({ ...state, 'key': key })}
    >
      <Card.Meta
      description="Here are some of your overall running stats"
      />
       {contentList[state.key]}
    </Card>
  );

  // return [
  //     <span role="img" aria-label="Hello">
  //       {`👋 ${athlete.firstname} ${athlete.lastname}`}
  //     </span>,
  //     <Avatar
  //       shape="square"
  //       size={256}
  //       icon="user"
  //       src={athlete.profile}
  //       alt={athlete.username}
  //     />,
  //     userStats && <div>
  //         <p>{`Total Strava runs: ${userStats.all_run_totals.count}`}</p>
  //         <p>{`Total Strava distance: ${round(userStats.all_run_totals.distance/1000)} km`}</p>
  //         <p>{`Total Strava moving time: ${round(userStats.all_run_totals.moving_time/60/60)} hours`}</p>
  //         <p>{`Average run distance: ${round(userStats.all_run_totals.distance/1000/userStats.all_run_totals.count)} km`}</p>
  //         <p>{`Average run moving time: ${round(userStats.all_run_totals.moving_time/60/60/userStats.all_run_totals.count)} hours`}</p>

  //     </div>
  //   ]
};

export default AthleteWelcome;
