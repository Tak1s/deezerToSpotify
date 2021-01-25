import { connect } from 'react-redux';
import StreamServiceList from './StreamServiceList';
import {
  getDeezerInfo,
  getSpotifyInfo
} from '~/store/users/actions';

const mapDispatchToProps = {
  getDeezerInfo,
  getSpotifyInfo
};

export default connect(
  null,
  mapDispatchToProps
)(StreamServiceList);
