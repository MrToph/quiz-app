import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, Card, CardItem, Body, Thumbnail, Left } from 'native-base'
import I18n from '../i18n'
import { View, ResultAnswerButton } from './index'
import Anchor from './Anchor'

export default class ResultCard extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    songTitle: PropTypes.string.isRequired,
    answered: PropTypes.number.isRequired,
    possibleArtists: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctArtistIndex: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    moreUrl: PropTypes.string,
  };

  static defaultProps = {
    thumbnail: '',
    moreUrl: '',
  };

  getAdditionalButtonProps = (buttonIndex) => {
    const { answered, correctArtistIndex } = this.props
    const defaultButtonProps = {
      small: true,
    }

    // 1. Correct button
    if (correctArtistIndex === buttonIndex) {
      // correctly answered => green bg
      if (answered === correctArtistIndex) {
        return {
          ...defaultButtonProps,
        }
      }
      // otherwise show correct artist with green border
      return {
        ...defaultButtonProps,
        bordered: true,
      }
    }
    // 2. Answered non-correct button => display red border
    if (answered === buttonIndex) {
      return {
        ...defaultButtonProps,
        danger: answered !== correctArtistIndex,
      }
    }
    // 3. Non-correct, non-answered button => white border
    return { ...defaultButtonProps, bordered: true, light: true }
  };

  renderAnswerButtons() {
    const { possibleArtists } = this.props
    return possibleArtists.map((artist, index) =>
      <ResultAnswerButton
        key={artist}
        title={artist}
        {...this.getAdditionalButtonProps(index)}
      />,
    )
  }

  render() {
    const { thumbnail, text, artist, songTitle, moreUrl } = this.props
    return (
      <Card style={{ paddingHorizontal: 8, paddingVertical: 8 }}>
        <CardItem>
          <Left>
            <Thumbnail large square source={{ uri: thumbnail }} />
            <Body>
              <Text>
                {artist}
              </Text>
              <Text>
                {songTitle}
              </Text>
              <Anchor text={I18n.t('btn.lyrics')} url={moreUrl} />
            </Body>
          </Left>
        </CardItem>
        <CardItem style={{ padding: 10 }} cardBody>
          <Text>
            {text}
          </Text>
        </CardItem>
        <CardItem>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            {this.renderAnswerButtons()}
          </View>
        </CardItem>
      </Card>
    )
  }
}
