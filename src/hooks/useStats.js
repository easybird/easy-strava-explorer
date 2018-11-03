import { useEffect, useState } from 'react';
import { getStats} from '../services/strava';

export default function useStats(accessToken) {
    const [stats, setStats] = useState();

    useEffect(async () => {
        if (!stats) {
            setStats(await getStats (accessToken));
        }
    }, [stats])

    return stats
}