import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBarAndroid } from 'react-native'
import { primary } from '../styling'

const ProgressBar = props =>
  <ProgressBarAndroid
    styleAttr="Horizontal"
    indeterminate={false}
    progress={props.progress}
    color={primary}
  />

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default ProgressBar
