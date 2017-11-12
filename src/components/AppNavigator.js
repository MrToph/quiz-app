import { StackNavigator } from 'react-navigation'
import Menu from '../screens/Menu'
import Result from '../screens/Result'
import Question from '../screens/Question'
import Settings from '../screens/Settings'
import { primary, dark2, dark3 } from '../styling'
import { createTransitionEnd } from '../store/navigation/actions'

const navigationOptions = {
  headerTintColor: primary,
  headerStyle: {
    backgroundColor: dark2,
  },
}

const AppNavigator = StackNavigator(
  {
    Menu: { screen: Menu },
    Question: { screen: Question },
    Result: { screen: Result },
    Settings: { screen: Settings },
  },
  {
    cardStyle: {
      backgroundColor: dark3,
    },
    navigationOptions,
    onTransitionEnd(...args) {
      this.navigation.dispatch(createTransitionEnd(...args))
    },
  },
)

export default AppNavigator
