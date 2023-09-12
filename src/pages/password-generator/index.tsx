import { specialChar } from "@/src/constant/PasswordGenerator/charset";
import { passwordLengthOption } from "@/src/constant/PasswordGenerator/options";
import { usePasswordGenerator } from "@/src/hooks/usePasswordGenerator";
import { NextPage } from "next";
import Head from "next/head";

const PasswordGenerator: NextPage = () => {
  const {
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
  } = usePasswordGenerator();

  return (
    <>
      <Head>
        <title>Password Generator</title>
      </Head>

      <div className="main">
        <h1>Password Generator</h1>
        <form
          onSubmit={handleGeneratePassword()}
          className="flex flex-col gap-2 w-full lg:w-3/4"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <label htmlFor="passwordLength" className="label">
              <p className="label-text">Password Length</p>
            </label>
            <div className="flex flex-row justify-between items-center gap-2 w-full lg:w-auto">
              {!watch("isPasswordLengthCustom") && (
                <select
                  id="passwordLength"
                  className="select select-bordered w-full lg:w-auto"
                  {...register("passwordLength")}
                  defaultValue={"16"}
                >
                  {passwordLengthOption.map((option, i) => {
                    return <option key={i}>{option.toString()}</option>;
                  })}
                </select>
              )}
              {watch("isPasswordLengthCustom") && (
                <input
                  type="number"
                  id="passwordLength"
                  className="input input-bordered w-full lg:w-auto"
                  {...register("passwordLength")}
                  defaultValue={getValues("passwordLength")}
                  min={6}
                  max={10000}
                />
              )}
              <div
                className="tooltip tooltip-top flex items-center"
                data-tip="Custom Length"
              >
                <input
                  type="checkbox"
                  className="toggle"
                  {...register("isPasswordLengthCustom", {
                    onChange: () => {
                      if (!getValues("isPasswordLengthCustom")) {
                        setValue("passwordLength", "16");
                      }
                    },
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="numOnly" className="label cursor-pointer">
              <p className="label-text">Number Only</p>
            </label>
            <input
              type="checkbox"
              className="checkbox"
              id="numOnly"
              {...register("numberOnly")}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="inclNum" className="label cursor-pointer">
              <p className="label-text">Include Number</p>
            </label>
            <input
              type="checkbox"
              className="checkbox"
              id="inclNum"
              defaultChecked
              {...register("includeNumber", {
                disabled: watch("numberOnly", true),
              })}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="inclLowCase" className="label cursor-pointer">
              <p className="label-text">Include Lowercase</p>
            </label>
            <input
              type="checkbox"
              className="checkbox"
              id="inclLowCase"
              defaultChecked
              {...register("includeLowerCase", {
                disabled: watch("numberOnly", false),
              })}
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="inclUpCase" className="label cursor-pointer">
              <p className="label-text">Include Uppercase</p>
            </label>
            <input
              type="checkbox"
              className="checkbox"
              id="inclUpCase"
              defaultChecked
              {...register("includeUpperCase", {
                disabled: watch("numberOnly", false),
              })}
            />
          </div>

          <div className="flex justify-between items-center">
            <label
              htmlFor="inclSpecial"
              className="label cursor-pointer tooltip"
              data-tip={specialChar}
            >
              <p className="label-text">Include Special Characters</p>
            </label>
            <input
              type="checkbox"
              className="checkbox"
              id="inclSpecial"
              {...register("includeSpecialChar", {
                disabled: watch("numberOnly", false),
              })}
            />
          </div>

          <div className="collapse collapse-arrow border border-neutral">
            <input type="checkbox" />
            <div className="collapse-title font-medium">Advanced Settings</div>

            <div className="collapse-content flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label htmlFor="beginLetter" className="label cursor-pointer">
                  <p className="label-text">Begin with a letter</p>
                </label>
                <input
                  type="checkbox"
                  className="checkbox"
                  id="beginLetter"
                  {...register("beginLetter", {
                    disabled: watch(
                      "numberOnly",
                      !(
                        watch("includeLowerCase", true) ||
                        watch("includeUpperCase", true)
                      )
                    ),
                  })}
                />
              </div>

              <div className="flex justify-between items-center">
                <label htmlFor="useCustomChar" className="label cursor-pointer">
                  <p className="label-text">Use custom characters</p>
                </label>
                <input
                  type="checkbox"
                  className="checkbox"
                  id="useCustomChar"
                  {...register("useCustomChar", {
                    disabled: !watch("includeSpecialChar", false),
                  })}
                />
              </div>

              {watch("includeSpecialChar") && watch("useCustomChar") && (
                <>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="customChar"
                      className="label cursor-pointer"
                    >
                      <p className="label-text">Custom characters</p>
                    </label>
                    <textarea
                      id=""
                      className="textarea textarea-bordered"
                      {...register("customChar", {
                        required: true,
                      })}
                      defaultValue={getValues("customChar")}
                    ></textarea>
                  </div>
                  {errors.customChar && <span>This field is required</span>}
                </>
              )}

              <div className="flex justify-between items-center">
                <label htmlFor="numOfPassword" className="label cursor-pointer">
                  <p className="label-text">Number of passwords</p>
                </label>
                <select
                  id="numOfPassword"
                  className="select select-bordered"
                  {...register("numOfPassword")}
                  defaultValue={1}
                >
                  {Array.from({ length: 50 }, (_, i) => i + 1).map(
                    (option, i) => {
                      return <option key={i}>{option.toString()}</option>;
                    }
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="py-8 flex flex-col lg:flex-row justify-between gap-4">
            <button type="submit" className="btn btn-outline flex-grow">
              Generate
            </button>
            <button
              type="button"
              className="btn btn-outline flex-grow"
              onClick={() => handleCopy()}
            >
              Copy
            </button>
          </div>
          <div className="">
            <textarea
              cols={70}
              rows={watch("numOfPassword")}
              className="w-full textarea textarea-bordered resize-none whitespace-normal"
              defaultValue={password}
              wrap={"off"}
              readOnly
            ></textarea>
          </div>
        </form>
      </div>

      {error && (
        <div className="toast px-8">
          <div className="alert alert-error">
            <span>{errorMsg}</span>
          </div>
        </div>
      )}
      {passwordCopied && (
        <div className="toast px-8">
          <div className="alert alert-info">
            <span>Password Copied!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordGenerator;
