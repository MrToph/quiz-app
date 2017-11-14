import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BackHandler } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import CodePush from 'react-native-code-push'
import CodePushConfig from './codepush'
import AppNavigator from './components/AppNavigator'
import { navigateBack } from './store/navigation/actions'
import {
  selectRoutingInfo,
  selectLanguage,
  selectCanGoBack,
} from './store/selectors'
import './services/AdMob'

@connect(
  state => ({
    nav: selectRoutingInfo(state),
    language: selectLanguage(state),
    canGoBack: selectCanGoBack(state),
  }),
  dispatch => ({
    dispatch,
    navigateBack: () => dispatch(navigateBack()),
  }),
)
class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.shape({}).isRequired,
    language: PropTypes.oneOf(['de', 'en']).isRequired,
    canGoBack: PropTypes.bool.isRequired,
    navigateBack: PropTypes.func.isRequired,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    if (!this.props.canGoBack) return false
    this.props.navigateBack()
    return true
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
