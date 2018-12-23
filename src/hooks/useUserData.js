import {useMappedState} from 'redux-react-hook';

const mapState = ({authentication, stats, ui}) => ({
    authenticated: authentication.authenticated,
    athlete: authentication.athlete,
    userStats: stats.userStats,
    error: ui.error,
  });

export default function useUserData()  {
    return useMappedState(mapState);
}
