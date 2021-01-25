import { connect } from 'react-redux';
import ServiceTracks from './ServiceTracks';
import {
  getServiceTracks
} from '~/store/tracks/actions';

const mapStateToProps = (state) => ({
  users: state.users,
  tracks: state.tracks.collection
});

const mapDispatchToProps = {
  getServiceTracks
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceTracks);
