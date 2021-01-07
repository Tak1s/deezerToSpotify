import helperUrl from '~/helpers/urls';

export default async (path = '') => {
  const response = await fetch(helperUrl.getUrl(path));
  const data = await response.json();
  return data;
};
