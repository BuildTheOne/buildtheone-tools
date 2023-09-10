interface IFormInput {
  passwordLength: string;
  isPasswordLengthCustom: boolean;
  numberOnly: boolean;
  includeNumber: boolean;
  includeLowerCase: boolean;
  includeUpperCase: boolean;
  includeSpecialChar: boolean;
  beginLetter: boolean;
  useCustomChar: boolean;
  customChar: string;
  numOfPassword: number;
}

export type { IFormInput };
