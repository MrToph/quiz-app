import React, { Component } from 'react'
import { ToastAndroid } from 'react-native'
import PropTypes from 'prop-types'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import I18n from '../i18n'
import {
  selectIsGameLoading,
  selectIsUpdating,
  selectUpdateProgress,
} from '../store/selectors'
import { Button } from '../components'
import BackgroundView from '../components/BackgroundView'
import ProgressBar from '../components/ProgressBar'
import {
  playGamePressed,
  settingsPressed,
  checkUpdatesPressed,
} from '../store/navigation/actions'

const screenStyles = {
  padding: 15,
}

const buttonStyles = {
  margin: 10,
}

@connect(
  state => ({
    isLoading: selectIsGameLoading(state),
    isUpdating: selectIsUpdating(state),
    updateProgress: selectUpdateProgress(state),
  }),
  {
    playGamePressed,
    checkUpdatesPressed,
    settingsPressed,
  },
)
export default class Menu extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: I18n.t('menu.header', screenProps.language),
  });

  static propTypes = {
    playGamePressed: PropTypes.func.isRequired,
    checkUpdatesPressed: PropTypes.func.isRequired,
    settingsPressed: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    updateProgress: PropTypes.number.isRequired,
  };

  onGamePlayPressed = () => {
    this.props.playGamePressed()
  };

  onSettingsPressed = () => {
    this.props.settingsPressed()
  };

  onUpdatePressed = () => {
    this.props.checkUpdatesPressed()
    .catch(err => ToastAndroid.show(err.message, ToastAndroid.LONG))
  };

  render() {
    const { isLoading, isUpdating, updateProgress } = this.props
    const disableButtons = isLoading || isUpdating
    return (
      <BackgroundView style={screenStyles}>
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.playGame')}
          onPress={this.onGamePlayPressed}
        />
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.checkUpdates')}
          onPress={this.onUpdatePressed}
        />
        <Button
          style={buttonStyles}
          disabled={disableButtons}
          title={I18n.t('btn.settings')}
          onPress={this.onSettingsPressed}
        />
        {disableButtons && <Spinner />}
        {isUpdating && <ProgressBar progress={updateProgress} />}
      </BackgroundView>
    )
  }
}
