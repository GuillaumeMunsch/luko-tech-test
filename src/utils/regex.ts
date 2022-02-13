export interface RegexUtils {
  numbers: RegExp;
}

const regex: RegexUtils = {
  numbers: /^\d+$/gm,
};

export default regex;
