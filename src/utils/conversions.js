const METRIC_CONVERSION = 60 * 60 / 1000;

export const metresPerSecondToKmPerHour = (metresPerSecond) => Math.round(metresPerSecond * METRIC_CONVERSION * 1000) / 1000

export const round = (target, decimals = 2) => Math.round(target*(10**decimals))/10**decimals;