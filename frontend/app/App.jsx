import React from 'react';
// import { PropTypes } from 'prop-types';
import Layer from './components/layer';
import StreamService from './components/StreamService';
import { deezer, spotify } from './constants';

const App = () => (
  <Layer>
    <StreamService
      name={ deezer }
      link="/auth/deezer"
    />
    <StreamService
      name={ spotify }
      link="/auth/spotify"
    />
  </Layer>
);

export default App;
