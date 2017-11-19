const buttonTexts = {
  playGame: 'Play Game',
  checkUpdates: 'Check for Updates',
  share: 'Share Score',
  replay: 'Play Again',
  lyrics: 'See lyrics on genius.com',
  settings: 'Settings',
}

const errors = {
  startGame: 'Could not start new game. Check your connection and try again.',
}

const codePush = {
  CHECKING_FOR_UPDATE: 'Checking for updates.',
  DOWNLOADING_PACKAGE: 'Downloading package.',
  INSTALLING_UPDATE: 'Installing update.',
  UP_TO_DATE: 'Up-to-date.',
  UPDATE_INSTALLED: 'Update installed.',
}

const menuScreen = {
  header: 'Welcome',
}

const questionsScreen = {
  header: 'Questions',
  progress: 'Question %{current} / %{total}',
}

const resultScreen = {
  header: 'Results',
  score: 'Score %{score} / %{total}:',
  title: 'Results',
  share: {
    message:
      'I just reached a score of %{score} on RapQuiz. Can you beat me? Get the app on Android. %{url}',
    title: 'Can you beat my RapQuiz score?',
    dialogTitle: 'Share your score and challenge a friend!',
  },
}

const settingsScreen = {
  header: 'Settings',
  language: {
    header: 'Language',
  },
  ads: {
    heading: 'Ads',
    remove: {
      heading: 'Remove ads',
      text:
        "If you don't like the ads and want to support me, you can purchase an ad-free version by clicking here.",
    },
    purchased: {
      heading: 'Ads removed',
      text: 'Thanks for supporting me.',
    },
  },
  app: {
    heading: 'Application',
    feedback: {
      heading: 'Feedback',
      text: 'Suggestions? Comments? Bugs?',
    },
    rate: {
      heading: 'Rate this app',
      text:
        'If you like this app, please rate it.\nIt helps more people discover it and motivates me to work on new features.',
    },
  },
  about: {
    heading: 'Development',
    website: {
      heading: 'Website',
      text: 'Want to get in touch with me? Want to hire me?',
    },
    twitter: {
      heading: 'Twitter',
      text: 'Follow me on Twitter!',
    },
  },
}

export default {
  btn: buttonTexts,
  error: errors,
  codePush,
  menu: menuScreen,
  questions: questionsScreen,
  result: resultScreen,
  settings: settingsScreen,
}
