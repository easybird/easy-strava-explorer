import { format } from "date-fns";

export const prettifyDate = date => {
 return format(date, 'D MMMM YYYY');
}