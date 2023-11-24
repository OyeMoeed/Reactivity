import React, {Component} from 'react';
import {AuthProvider} from '../firebase/AuthProvider';
import Routes from './Routex';
import {bindActionCreators} from 'redux';
import {fetchUser, fetchUserPosts} from '../redux/actions';
import {connect} from 'react-redux';

export class Index extends Component {
  componentDidMount(): void {
    this.props.fetchUserPosts();
    this.props.fetchUser();
  }
  render(): React.ReactNode {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}

const mapDispatchUser = dispatch =>
  bindActionCreators({fetchUser, fetchUserPosts}, dispatch);
const mapDispatchStore = store => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapDispatchStore, mapDispatchUser)(Index);
