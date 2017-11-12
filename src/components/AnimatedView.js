import React from 'react'
import PropTypes from 'prop-types'
import { Easing, Animated } from 'react-native'
import { View } from './index'
import BackgroundView from './BackgroundView'
import { dark3 } from '../styling'

function resetState(props) {
  if (props.animationState === 'ENTER_START') {
    return {
      opacity: new Animated.Value(0),
    }
  }
  if (props.animationState === 'EXIT_START') {
    return {
      opacity: new Animated.Value(1.0),
    }
  }
  return {}
}

const duration = 500

const viewStyles = {
  margin: 10,
}

export default class AnimatedView extends React.Component {
  static propTypes = {
    animationState: PropTypes.oneOf([
      'ENTER_START',
      'ENTER_END',
      'EXIT_START',
      'EXIT_END',
      '',
    ]).isRequired,
    children: PropTypes.node.isRequired,
    onAnimationFinished: PropTypes.func.isRequired,
    style: PropTypes.object // eslint-disable-line
  };

  static defaultProps = {
    style: null,
  };

  constructor(props) {
    super(props)
    this.state = resetState(props)
  }

  componentDidMount() {
    this.restartAnimation()
  }

  componentWillReceiveProps(nextProps) {
    // did an animation trigger change?
    if (this.props.animationState === nextProps.animationState) return
    const state = resetState(nextProps)
    this.setState(state, this.restartAnimation)
  }

  restartAnimation = () => {
    if (!this.props.animationState.includes('START')) return

    const toValue = this.props.animationState.includes('ENTER') ? 1 : 0
    Animated.timing(this.state.opacity, {
      toValue,
      duration,
      easing: Easing.linear,
    }).start(this.props.onAnimationFinished)
  };

  render() {
    return (
      <BackgroundView>
        <Animated.View
          style={{
            ...this.props.style,
            padding: 10,
            backgroundColor: 'transparent',
            opacity: this.state.opacity,
            alignSelf: 'stretch',
          }}
        >
          {this.props.children}
        </Animated.View>
      </BackgroundView>
    )
  }
}
