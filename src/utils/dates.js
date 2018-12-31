import { format } from "date-fns";

export const prettifyDate = date => format(date, 'D MMMM YYYY')

export const prettifyMinutes = minutes => {
        const seconds = Number(minutes*60);
        const d = Math.floor(seconds / (3600*24));
        const h = Math.floor(seconds % (3600*24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 3600 % 60);

        const dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
        const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
        const mDisplay = m > 0 ? m + (m === 1 ? " min " : " min ") : "";
        const sDisplay = s > 0 ? s + (s === 1 ? " sec" : " sec") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
}