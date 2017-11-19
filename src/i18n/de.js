const buttonTexts = {
  playGame: 'Starte Quiz',
  checkUpdates: 'Suche nach Updates',
  share: 'Teile Score',
  replay: 'Nochmals Spielen',
  lyrics: 'Lyrics anzeigen',
  settings: 'Einstellungen',
}

const errors = {
  startGame:
    'Konnte kein neues Quiz starten. Überprüfe die Internetverbindung und versuche es noch einmal.',
}

const codePush = {
  CHECKING_FOR_UPDATE: 'Suche nach Updates...',
  DOWNLOADING_PACKAGE: 'Downloade Upate...',
  INSTALLING_UPDATE: 'Installiere Update...',
  UP_TO_DATE: 'Up-to-date.',
  UPDATE_INSTALLED: 'Update installiert.',
}

const menuScreen = {
  header: 'Menü',
}

const questionsScreen = {
  header: 'Quiz',
  progress: 'Frage %{current} / %{total}',
}

const resultScreen = {
  header: 'Ergebnis',
  score: 'Score %{score} / %{total}:',
  title: 'Antworten',
  share: {
    message:
      'Ich erkannte %{score} Punchlines im Rap-Quiz. Teste dein Rap Wissen! Hol dir die App auf Android. %{url}',
    title: 'Kannst du meinen Rap-Quiz Score schlagen?',
    dialogTitle: 'Teile deinen Score und fordere einen Freund heraus!',
  },
}

const settingsScreen = {
  header: 'Einstellungen',
  language: {
    header: 'Sprache',
  },
  ads: {
    heading: 'Werbung',
    remove: {
      heading: 'Werbung entfernen',
      text: 'Wenn dir die Werbung nicht gefällt oder du mich unterstützen möchest, kannst du eine werbefreie Version kaufen indem du hier klickst.',
    },
    purchased: {
      heading: 'Werbung entfernt',
      text: 'Danke für die Unterstützung.',
    },
  },
  app: {
    heading: 'Anwendung',
    feedback: {
      heading: 'Feedback',
      text: 'Wünsche? Kommentare? Bugs?',
    },
    rate: {
      heading: 'App bewerten',
      text: 'Wenn dir diese App gefällt, bewerte sie bitte.\nEs trägt dazu bei dass mehr Leute die App finden und motiviert mich an neuen Features zu arbeiten.',
    },
  },
  about: {
    heading: 'Entwicklung',
    website: {
      heading: 'Website',
      text: 'Möchtest du mich kontaktieren? Möchtest du mit mir arbeiten?',
    },
    twitter: {
      heading: 'Twitter',
      text: 'Folge mir auf Twitter.',
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
