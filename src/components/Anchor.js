import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Linking } from 'react-native'
import { Text } from 'native-base'
import { primary } from '../styling'

const anchorStyle = {
  color: primary,
  fontSize: 16,
}

export default class Anchor extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  };
  render() {
    const { url, text } = this.props
    return (
      <Text note style={anchorStyle} onPress={() => Linking.openURL(url)}>
        {text}
      </Text>
    )
  }
}
