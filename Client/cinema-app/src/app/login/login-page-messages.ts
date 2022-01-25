export type AuthenticationPages = 'register' | 'login';

interface LoginPageMessages {
  [key: string]: { title: string, message: string, caption: string }
}

export const loginPageMessages: LoginPageMessages = {
  'register': {
    title: 'Register',
    message: 'Welcome!',
    caption: 'Register with my email'
  },
  'login': {
    title: 'Sign-in',
    message: 'We\'re glad to see you again. Please sign-in',
    caption: 'Sign-in with my email'
  }
};
