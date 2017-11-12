/* eslint-disable global-require */
import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import PropTypes from 'prop-types'

// http://facebook.github.io/react-native/releases/0.49/docs/images.html#background-image-via-nesting
export default class BackgroundView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    const { children, ...otherProps } = this.props
    return (
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ width: 'auto', height: '100%' }}
        source={require('../images/bg.jpg')}
      >
        {children}
      </ImageBackground>
    )
  }
}
