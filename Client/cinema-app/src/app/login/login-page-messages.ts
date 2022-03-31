export type LoginPageKeys = 'register' | 'login';

export interface LoginPageElements {
  title: string,
  message: string,
  caption: string
}

export const loginPageMessages: Record<LoginPageKeys, LoginPageElements> = {
  register: {
    title: 'Register',
    message: 'Welcome!',
    caption: 'Register with my email'
  },
  login: {
    title: 'Sign-in',
    message: 'We\'re glad to see you again. Please sign-in',
    caption: 'Sign-in with my email'
  }
};
