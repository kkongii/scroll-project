import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: Date | string | null) => {
  if (!date) return '';
  return format(new Date(date), 'yy/MM/dd', {
    locale: ko
  });
};

export const formatExcelDownloadDate = (
  date: Date | undefined | string | null
) => {
  if (!date) return '';
  return format(new Date(date), 'yyyy-MM-dd', {
    locale: ko
  });
};
