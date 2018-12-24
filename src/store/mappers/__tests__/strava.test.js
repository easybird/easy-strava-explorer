import activities from '../../../../mocks/activities.json';
import mapActivitiesToStats from '../strava';

describe('Map Activities to Stats', () => {
    it('should map them correctly', () => {
        const stats = mapActivitiesToStats(activities);
        // - 1 for one Ride in stead of Run
        expect(Object.values(stats)).toHaveLength(activities.length - 1);

        const stat = Object.values(stats)[0];

        expect(stat.hasPhoto).toBeTruthy();
        console.log('---stat', stat, '\n');
        console.log('---runStats', stat.runStats, '\n');
        expect(stat.runStats.time).not.toBeNull();

    });
});