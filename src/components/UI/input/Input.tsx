import React, { useImperativeHandle, useRef, useState } from "react";
import classes from "./Input.module.scss";
import { useTranslation } from "react-i18next";

interface Props {
  id: string;
  type: string;
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
  classes?: string;
  value?: string;
  ref?: HTMLInputElement;
  readonly?: boolean;
  autocomplete?: string;
}

interface IImperativeHandler {
  focus: () => void;
  value?: string;
}
const Input = React.forwardRef<IImperativeHandler, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(props.value || "");

  function inputChangeHandler(e: React.FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  function inputFocused() {
    inputRef.current?.focus();
    inputRef.current?.setAttribute("style", "border:2px solid red");
  }
  const { t } = useTranslation();
  useImperativeHandle(ref, () => {
    return {
      focus: inputFocused,
      value: value,
    };
  });

  return (
    <div className={`${classes.form__control} ${props.classes}`}>
      <label htmlFor={props.id}>{t(`${props.id}`)}</label>
      <input
        ref={inputRef}
        id={props.id}
        minLength={props.minLength}
        maxLength={props.maxLength}
        type={props.type}
        placeholder={props.placeholder}
        value={value}
        readOnly={props.readonly || false}
        onChange={inputChangeHandler}
        autoComplete={props.autocomplete || "off"}
      />
    </div>
  );
});

export default Input;
