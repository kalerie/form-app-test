import { forwardRef } from "react";
import { InputProps } from "../models/Forms.model";
import errorIcon from "../assets/error-icon.svg";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, ...props },
  ref
) {
  const baseClasses =
    "w-full h-[48px] p-1 border rounded-lg  text-[#000853] focus:outline-none focus:border-[#761BE4] focus:bg-[#FAF9FA] focus:border-[2px]";
  const errorClasses = error
    ? "border-[#ED4545] border-2 bg-[#FEECEC]"
    : "border-[#CBB6E5]  bg-white";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-base font-normal" htmlFor={props.id}>
        {label}
      </label>
      <input
        ref={ref}
        className={`${baseClasses} ${errorClasses}`}
        {...props}
      />
      <div className="control-error">
        {error && (
          <p className="flex gap-2">
            <img src={errorIcon} alt="error icon" />
            <span className="w-[50%] text-[14px]">{error}</span>
          </p>
        )}
      </div>
    </div>
  );
});

export default Input;
