const METRIC_CONVERSION = 60 * 60 / 1000;

export const metresPerSecondToKmPerHour = (metresPerSecond) => {
    return Math.round(metresPerSecond * METRIC_CONVERSION * 1000) / 1000;
}

export const round = (target) => Math.round(target*1000)/1000;