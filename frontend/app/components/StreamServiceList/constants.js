import { services } from '../../../../config/constants';
import deezer from '~/static/deezer-logo.png';
import spotify from '~/static/spotify-logo.png';

export const streamServicesList = [
  {
    id: services.deezer,
    title: 'Deezer',
    icon: deezer,
    link: '/auth/deezer'
  },
  {
    id: services.spotify,
    title: 'Spotify',
    icon: spotify,
    link: '/auth/spotify'
  }
];
