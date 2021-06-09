import { connect } from 'react-redux';
import ServiceSettings from './ServiceSettings';

const mapStateToProps = (state) => ({
  users: state.users,
  tracks: state.tracks
});

export default connect(
  mapStateToProps
)(ServiceSettings);
