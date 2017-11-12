import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScrollView } from 'react-native'
import { Text, H2 } from 'native-base'
import { connect } from 'react-redux'
import CountdownCircle from 'react-native-countdown-circle'
import I18n from '../i18n'
import { View, AnswerButton } from '../components'
import AnimatedView from '../components/AnimatedView'
import ProgressBar from '../components/ProgressBar'
import { answerQuestionPress } from '../store/quiz/actions'
import {
  questionAnimationStart,
  questionAnimationFinished,
} from '../store/navigation/actions'
import {
  selectCurrentQuestionData,
  selectCurrentQuestionIndex,
  selectNumberOfQuestions,
  selectAnimationState,
} from '../store/selectors'
import { primary, dark3, dark2 } from '../styling'

const styles = {
  verticalContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

@connect(
  state => ({
    question: selectCurrentQuestionData(state),
    currentQuestionIndex: selectCurrentQuestionIndex(state),
    numberOfQuestions: selectNumberOfQuestions(state),
    animationState: selectAnimationState(state),
  }),
  {
    answerQuestionPress,
    questionAnimationFinished,
    questionAnimationStart,
  },
)
export default class Question extends Component {
  static propTypes = {
    answerQuestionPress: PropTypes.func.isRequired,
    questionAnimationFinished: PropTypes.func.isRequired,
    questionAnimationStart: PropTypes.func.isRequired,
    animationState: PropTypes.oneOf([
      'ENTER_START',
      'ENTER_END',
      'EXIT_START',
      'EXIT_END',
      '',
    ]).isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
    numberOfQuestions: PropTypes.number.isRequired,
    question: PropTypes.shape({
      text: PropTypes.string.isRequired,
      possibleArtists: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired,
      correctArtistIndex: PropTypes.number.isRequired,
    }).isRequired,
  };

  static navigationOptions = ({ screenProps }) => ({
    title: I18n.t('questions.header', screenProps.language),
  });

  state = {
    answerIndex: -1,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.animationState === 'ENTER_START') {
      this.setState({
        answerIndex: -1,
      })
    }
  }

  onAnswer = (answerIndex) => {
    this.setState({
      answerIndex,
    })
    // start the exit animation and queue our answer which gets called in onAnimationFinished
    this.props.questionAnimationStart('EXIT')
  };

  onCountdownFinished = () => {
    this.setState({
      answerIndex: -1,
    })
    // start the exit animation and queue our answer which gets called in onAnimationFinished
    this.props.questionAnimationStart('EXIT')
  };

  onAnimationFinished = () => {
    const { animationState } = this.props
    const { answerIndex } = this.state
    this.props.questionAnimationFinished()
    if (animationState === 'EXIT_START') {
      // submit and restart animation
      this.props.answerQuestionPress(answerIndex)
    }
  };

  getAdditionalButtonProps = (buttonIndex) => {
    const { answerIndex } = this.state
    if (answerIndex === -1) return { bordered: true }

    const { correctArtistIndex } = this.props.question
    // always show correct artist with default green bg
    if (correctArtistIndex === buttonIndex) return {}
    // display possible error on selected button
    if (answerIndex === buttonIndex) {
      return {
        danger: answerIndex !== correctArtistIndex,
      }
    }
    return { bordered: true }
  };

  renderAnswerButtons = () => {
    const { question } = this.props
    const { possibleArtists } = question

    return possibleArtists.map((artist, i) =>
      <AnswerButton
        key={artist}
        title={artist}
        onPress={() => this.onAnswer(i)}
        {...this.getAdditionalButtonProps(i)}
      />,
    )
  };

  renderProgress = () => {
    const { numberOfQuestions: total, currentQuestionIndex } = this.props
    const current = currentQuestionIndex + 1
    return (
      <View style={{ flex: 0 }}>
        <H2>
          {I18n.t('questions.progress', {
            current,
            total,
          })}
        </H2>
        <ProgressBar progress={current / total} />
      </View>
    )
  };

  render() {
    const { question, animationState } = this.props
    const { text } = question
    return (
      <AnimatedView
        animationState={animationState}
        onAnimationFinished={this.onAnimationFinished}
      >
      <ScrollView>
        {this.renderProgress()}
        <Text
          style={{
            padding: 10,
            marginBottom: 10,
            fontSize: 18,
            // fontStyle: 'italic',
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
        <View style={styles.verticalContainer}>
          {this.renderAnswerButtons()}
        </View>
        {this.props.animationState === 'ENTER_END' &&
          <View
            style={{
              alignItems: 'center',
              flex: 0,
              marginTop: 20,
            }}
          >
            <CountdownCircle
              seconds={30}
              radius={30}
              borderWidth={4}
              color={primary}
              shadowColor={dark2}
              bgColor={dark3}
              onTimeElapsed={this.onCountdownFinished}
            />
          </View>}
          </ScrollView>
      </AnimatedView>
    )
  }
}
