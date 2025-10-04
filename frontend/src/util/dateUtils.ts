import { format } from 'date-fns';

export const formatMacedonianDateTime = (date: string | Date, showTime: boolean = true): string => {
  if(!date) return null

  const d = new Date(date);
  return showTime
    ? format(d, 'dd.MM.yyyy HH:mm:ss')
    : format(d, 'dd.MM.yyyy');
};