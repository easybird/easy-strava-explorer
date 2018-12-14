import React, {useState} from 'react';
import { Card} from 'antd';
import {round} from '../utils/conversions';
import {prettifyDate} from '../utils/dates';

const MAX_EARTH_KM = 40075;
const BRUSSELS_MOSCOW = 2561;
const BRUSSELS_LISBOA = 2040;
const BRUSSELS_MADRID = 1574;
const BRUSSELS_LYON = 726;
const BRUSSELS_PARIS = 303;

const getTotalDistanceSentence = (distance, city) => {
  const runToCities = ({distanceRan, exampleDistance, cities}) =>
    `That's like running ${round(distanceRan / exampleDistance)} times from ${
      cities[0]
    } to ${cities[1]}! `;

  if (distance > MAX_EARTH_KM) {
    return `That's like running more then ${round(
      distance / MAX_EARTH_KM
    )} times around the earth!`;
  } else if (distance > BRUSSELS_MOSCOW) {
    return runToCities({
      distanceRan: distance,
      exampleDistance: BRUSSELS_MOSCOW,
      cities: ['Brussels', 'Moscow'],
    });
  } else if (distance > BRUSSELS_LISBOA) {
    return runToCities({
      distanceRan: distance,
      exampleDistance: BRUSSELS_LISBOA,
      cities: ['Brussels', 'Lisboa'],
    });
  } else if (distance > BRUSSELS_MADRID) {
    return runToCities({
      distanceRan: distance,
      exampleDistance: BRUSSELS_MADRID,
      cities: ['Brussels', 'Madrid'],
    });
  } else if (distance > BRUSSELS_LYON) {
    return runToCities({
      distanceRan: distance,
      exampleDistance: BRUSSELS_LYON,
      cities: ['Brussels', 'Lyon'],
    });
  } else if (distance > BRUSSELS_PARIS) {
    return runToCities({
      distanceRan: distance,
      exampleDistance: BRUSSELS_PARIS,
      cities: ['Brussels', 'Paris'],
    });
  } else {
    return `Thats like...not that far? You just ran a few blocks in the city of ${city}?`;
  }
};

const Text = ({text}) => <em>{text}</em>;
const EmphasisedText = ({text}) => <em style={{fontSize: '150%'}}>{text}</em>;

const AthleteIntroText = ({
  totalRunCount,
  firstRunningDay,
  totalMovingTime,
  totalDistanceTime,
  city,
}) => {
  const totalDistanceTimeInKilometres = round(totalDistanceTime / 1000, 0);
  return (
    <p>
      <Text text="You ran " />
      <EmphasisedText text={totalRunCount} />
      <Text text={` times since ${prettifyDate(firstRunningDay)}. `} />
      <br />
      <Text text={`After running for `} />
      <EmphasisedText text={`${round(totalMovingTime / 60 / 60, 0)} `} />
      <Text text={`hours in total, you've crossed `} />
      <EmphasisedText text={`${totalDistanceTimeInKilometres} `} />
      <Text text={`kilometres.`} />
      <br />
      <Text
        text={`${getTotalDistanceSentence(
          totalDistanceTimeInKilometres,
          city
        )}`}
      />
      <br />
    </p>
  );
};

const AthleteWelcome = ({athlete, userStats}) => {
  console.log('---userStats', userStats, '\n');
  const [state, setState] = useState({
    key: 'allTime',
  });

  const tabList = [
    {
      key: 'allTime',
      tab: 'All time',
    },
    {
      key: 'thisYear',
      tab: 'This year',
    },
  ];

  const contentList = {
    allTime: userStats && (
      <div>
        {console.log(userStats)}
        <AthleteIntroText
          totalRunCount={userStats.all_run_totals.count}
          firstRunningDay={athlete.created_at}
          totalMovingTime={userStats.all_run_totals.moving_time}
          totalDistanceTime={userStats.all_run_totals.distance}
          city={athlete.city}
        />
        <hr />
        <p>
          <EmphasisedText
            text={
              userStats.all_run_totals.distance > 100
                ? 'Keep up the good work!'
                : 'Step up your game, bro!'
            }
          />
        </p>
        <hr />
        <p>{`Average running distance: ${round(
          userStats.all_run_totals.distance /
            1000 /
            userStats.all_run_totals.count
        )} km`}</p>
        <p>{`Average run moving time: ${round(
          userStats.all_run_totals.moving_time /
            60 /
            userStats.all_run_totals.count
        )} minutes`}</p>
      </div>
    ),
    thisYear: userStats && (
      <div>
        <AthleteIntroText
          totalRunCount={userStats.ytd_run_totals.count}
          firstRunningDay={new Date(new Date().getFullYear(), 0, 1)}
          totalMovingTime={userStats.ytd_run_totals.moving_time}
          totalDistanceTime={userStats.ytd_run_totals.distance}
          city={athlete.city}
        />
        <hr />
        <p>
          <EmphasisedText
            text={
              userStats.ytd_run_totals.distance > 50
                ? 'Keep up the good work!'
                : 'Step up your game, bro!'
            }
          />
        </p>
        <hr />
        <p>{`Average running distance: ${round(
          userStats.ytd_run_totals.distance /
            1000 /
            userStats.ytd_run_totals.count
        )} km`}</p>
        <p>{`Average run moving time: ${round(
          userStats.ytd_run_totals.moving_time /
            60 /
            userStats.ytd_run_totals.count
        )} minutes`}</p>
      </div>
    ),
  };

  return (
    <Card
      style={{width: '100%', maxWidth: '450px'}}
      title={`👋 ${athlete.firstname} ${athlete.lastname}, check your stats`}
      cover={<img src={athlete.profile} alt={athlete.username} />}
      tabList={tabList}
      activeTabKey={state.key}
      onTabChange={key => setState({...state, key: key})}
    >
      {contentList[state.key]}
    </Card>
  );
};

export default AthleteWelcome;
