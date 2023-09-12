import { useEffect, useState } from "react";
import {
  lowerCaseChar,
  numberChar,
  specialChar,
  upperCaseChar,
} from "../constant/PasswordGenerator/charset";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "../types/PasswordGeneratorType";

function usePasswordGenerator() {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordCopied, setPasswordCopied] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (
      !data.includeNumber &&
      !data.includeLowerCase &&
      !data.includeUpperCase &&
      !data.includeSpecialChar &&
      !data.numberOnly
    ) {
      setError(true);
      setErrorMsg("Choose minimum 1 option");
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 5000);
      return;
    }
    setPassword("");
    const passwordList = [];
    for (let i = 0; i < data.numOfPassword; i++) {
      passwordList.push(generatePassword());
    }
    setPassword(passwordList.join("\n"));
  };

  function handleGeneratePassword() {
    return handleSubmit(onSubmit);
  }

  const generateCharset = () => {
    let charset = "";

    if (getValues("numberOnly")) {
      charset += numberChar;
      return charset;
    }
    if (getValues("includeNumber")) {
      charset += numberChar;
    }
    if (getValues("includeLowerCase")) {
      charset += lowerCaseChar;
    }
    if (getValues("includeUpperCase")) {
      charset += upperCaseChar;
    }
    if (getValues("includeSpecialChar")) {
      if (getValues("useCustomChar")) {
        charset += getValues("customChar");
      } else {
        charset += specialChar;
      }
    }
    charset = Array.from(new Set(charset)).join("").replace(" ", "");

    return charset;
  };

  const generatePassword = () => {
    let password = "";
    const charset = generateCharset();
    const passwordLength = getValues("passwordLength");
    for (let i = 0; i < Number.parseInt(passwordLength); i++) {
      if (getValues("beginLetter")) {
        if (i == 0) {
          let tempChars = charset.replace(/[^a-zA-Z]+/g, "");
          const random = Math.floor(Math.random() * tempChars.length);
          const c = tempChars.charAt(random);
          password += c;
        }
      }
      const random = Math.floor(Math.random() * charset.length);
      const c = charset.charAt(random);
      password += c;
    }

    return password;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setPasswordCopied(true);
    setTimeout(() => {
      setPasswordCopied(false);
    }, 5000);
  };

  useEffect(() => {
    setValue("customChar", specialChar);
  }, [setValue]);

  return {
    register,
    handleGeneratePassword,
    watch,
    getValues,
    setValue,
    errors,
    password,
    error,
    errorMsg,
    passwordCopied,
    handleCopy,
  };
}

export { usePasswordGenerator };
