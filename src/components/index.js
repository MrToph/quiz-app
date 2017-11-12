/* eslint-disable react/prop-types, no-redeclare */
import React from 'react'
import { View as RNView, ScrollView as RNScrollView } from 'react-native'
import { Button as NBButton, Text, Icon } from 'native-base'

function wrapStyle(Component, customStyle, customProps) {
  return (props) => {
    const { style, ...otherProps } = props
    const concatenatedStyle = Array.isArray(style)
      ? [customStyle, ...style]
      : [customStyle, style]
    return (
      <Component style={concatenatedStyle} {...customProps} {...otherProps} />
    )
  }
}

const viewStyle = {
  backgroundColor: 'transparent',
  flex: 1,
}
export const View = wrapStyle(RNView, viewStyle)

const scrollViewStyle = {
  backgroundColor: 'transparent',
}
export const ScrollView = wrapStyle(RNScrollView, scrollViewStyle)

export const Button = (props) => {
  const { title, ...otherProps } = props
  return (
    <NBButton block {...otherProps}>
      <Text>
        {title}
      </Text>
    </NBButton>
  )
}

export const ReplayButton = (props) => {
  const { title, ...otherProps } = props
  return (
    <NBButton iconRight rounded {...otherProps}>
      <Text>
        {title}
      </Text>
      <Icon name="refresh" />
    </NBButton>
  )
}

export const AnswerButton = (props) => {
  const { title, ...otherProps } = props
  return (
    <NBButton style={{ alignSelf: 'center', marginVertical: 5 }} rounded {...otherProps}>
      <Text numberOfLines={1} style={{}}>
        {title}
      </Text>
    </NBButton>
  )
}

export const ResultAnswerButton = (props) => {
  const { title, ...otherProps } = props
  return (
    <NBButton
      style={{ alignSelf: 'center', margin: 2 }}
      rounded
      {...otherProps}
    >
      <Text numberOfLines={1} style={{}}>
        {title}
      </Text>
    </NBButton>
  )
}



export const ShareButton = (props) => {
  const { title, ...otherProps } = props
  return (
    <NBButton iconRight rounded {...otherProps}>
      <Text>
        {title}
      </Text>
      <Icon name="share" />
    </NBButton>
  )
}
