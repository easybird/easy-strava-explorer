import { format } from "date-fns";

export const prettifyDate = date => format(date, 'D MMMM YYYY')