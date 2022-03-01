export class ValidationPatterns {
  static readonly ONLY_NUMBERS_PATTERN = /^[0-9]*$/;
  static readonly HAS_ONE_OR_MORE_LOWERCASE_CHARACTERS_PATTERN = /^(?=.*[a-z])/;
  static readonly HAS_ONE_OR_MORE_UPPERCASE_CHARACTERS_PATTERN = /^(?=.*[A-Z])/;
  static readonly HAS_ONE_OR_MORE_NUMBERS_PATTERN = /^(?=.*[0-9])/;
}
