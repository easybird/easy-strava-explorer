import {metresPerSecondToKmPerHour} from '../../utils/conversions';

export function mapDetailRunToStat(run) {
    return {
        photoUrl: run.photos && run.photos.primary && run.photos.primary.urls["600"]
    }
}

function mapActivityToStat(activity) {
  const averageSpeed = metresPerSecondToKmPerHour(activity.average_speed);
  const averageHeartRate = activity.average_heartrate;
  const hrRs = averageHeartRate / averageSpeed;
  return {
    stravaId: activity.id,
    name: activity.name,
    date: new Date(activity.start_date),
    hasPhoto: !!activity.total_photo_count,
    location:
      activity.location_city ||
      activity.location_state ||
      activity.location_country,
    runStats: {
      time: activity.moving_time / 60, // in minutes
      distance: activity.distance / 1000, // in kilometres
      speed: {
        max: metresPerSecondToKmPerHour(activity.max_speed), // km/h
        average: averageSpeed, // km/h
      },
      elevationGain: activity.total_elevation_gain, // in metres
      heartRate: {
        max: activity.max_heartrate,
        average: averageHeartRate,
      },
      hrRs,
    },
  };
}

export default function mapActivitiesToStats(activities) {
  return activities.filter(({type}) => type === 'Run').reduce(
    (statsObject, activity) => ({
      ...statsObject,
      [new Date(activity.start_date).getTime()]: mapActivityToStat(activity),
    }),
    {}
  );
}
