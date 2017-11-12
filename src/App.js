import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import CodePush from 'react-native-code-push'
import CodePushConfig from './codepush'
import AppNavigator from './components/AppNavigator'
import { selectRoutingInfo, selectLanguage } from './store/selectors'
import './services/AdMob'

@connect(state => ({
  nav: selectRoutingInfo(state),
  language: selectLanguage(state),
}))
class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.shape({}).isRequired,
    language: PropTypes.oneOf(['de', 'en']).isRequired,
  };
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })}
        screenProps={{ language: this.props.language }}
      />
    )
  }
}

export default CodePush(CodePushConfig)(App)
