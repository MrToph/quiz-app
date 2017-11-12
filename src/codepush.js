import CodePush from 'react-native-code-push'

export default {
  installMode: CodePush.InstallMode.ON_NEXT_RESUME,
  minimumBackgroundDuration: 60 * 10,
}

export const activeConfig = {
  updateDialog: true,
  installMode: CodePush.InstallMode.IMMEDIATE,
}
