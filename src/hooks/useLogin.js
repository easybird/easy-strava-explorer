import { useEffect, useState } from 'react';

const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';
const LOCAL_STORAGE_ATHLETE = 'athlete';

export default function useLogin() {
    const [accessToken, setAccessToken] = useState(undefined);
    const [athlete, setAthlete] = useState(undefined);
    const [ isLoggedIn, setIsLoggedIn ] = useState(undefined)

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
        const athlete = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ATHLETE));

        if (accessToken) {
            setAccessToken(accessToken);
            setAthlete(athlete);
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [isLoggedIn])

    return { accessToken, athlete, isLoggedIn}
}