import React, {Component} from 'react';
import {AuthProvider} from '../firebase/AuthProvider';
import Routes from './Routex';
import {bindActionCreators} from 'redux';
import {fetchUser} from '../redux/actions';
import {connect} from 'react-redux';

export class Index extends Component {
  componentDidMount(): void {
    this.props.fetchUser;
  }
  render(): React.ReactNode {
    return (
      <AuthProvider>
        <Routes />
      </AuthProvider>
    );
  }
}

const mapDispatchUser = dispatch => bindActionCreators({fetchUser}, dispatch);

export default connect(null, mapDispatchUser)(Index);
