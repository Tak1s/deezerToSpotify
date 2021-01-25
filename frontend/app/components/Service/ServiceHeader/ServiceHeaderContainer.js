import { connect } from 'react-redux';
import ServiceHeader from './ServiceHeader';
import {
  getDeezerInfo,
  getSpotifyInfo
} from '~/store/users/actions';

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = {
  getDeezerInfo,
  getSpotifyInfo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceHeader);
