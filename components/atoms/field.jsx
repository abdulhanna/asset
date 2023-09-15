import classNames from "classnames";
import { useState } from "react";
import { motion } from "framer-motion";

const Text = ({
  children,
  size = "md",
  weight = "normal",
  color = "black",
  colorWeight = "4x",
  classname = "",
}) => {
  return (
    <div
      className={classNames(`
        ${
          {
            xs: "text-[10px] 2xl:text-[12px]",
            sm: "text-[12px] 2xl:text-[14px]",
            md: "text-[14px] 2xl:text-[16px]",
            lg: "text-[16px] 2xl:text-[18px]",
            xl: "text-[18px] 2xl:text-[22px]",
            "2xl": "text-[22px] 2xl:text-[26px]",
          }[size]
        }
        ${
          {
            light: "font-thin",
            normal: "font-normal",
            medium: "font-body",
            semibold: "font-semibold",
            bold: "font-bold",
          }[weight]
        },
        ${
          {
            "1x": `text-${color}-100`,
            "2x": `text-${color}-200`,
            "3x": `text-${color}-300`,
            "4x": `text-${color}-400`,
            "5x": `text-${color}-500`,
            "6x": `text-${color}-600`,
            "7x": `text-${color}-700`,
            "8x": `text-${color}-800`,
            "9x": `text-${color}-900`,
          }[colorWeight]
        }
      font-body tracking-wide ${classname}
    `)}>
      {children}
    </div>
  );
};
export const Text1 = ({
  children,
  size = "md",
  weight = "normal",
  //   color = 'slate',
  // colorWeight = '3x',
  color = "text-black-300",
  className = "",
}) => {
  return (
    <div
      className={classNames(
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-3xl": size === "3xl",
        },
        {
          "font-light": weight === "light",
          "font-normal": weight === "normal",
          "font-body": weight === "medium",
          "font-semibold": weight === "semibold",
          "font-bold": weight === "bold",
        },
        //  {
        //   [`text-${color}-300`]: colorWeight === '3x',
        //   [`text-${color}-400`]: colorWeight === '4x',
        //   [`text-${color}-500`]: colorWeight === '5x',
        //   [`text-${color}-600`]: colorWeight === '6x',
        //   [`text-${color}-700`]: colorWeight === '7x',
        //   [`text-${color}-800`]: colorWeight === '8x',
        //   [`text-${color}-900`]: colorWeight === '9x',
        //  },
        // `text-${color}-${colorWeight}`,
        color,
        "font-body",
        "tracking-wide leading-4	",
        className
      )}>
      <p>

      {children}
      </p>
    </div>
  );
};

export const InputField = ({
  children,
  type,
  id,
  onChange = (e) => {},
  placeHolder,
  name = "",
  defaultValue = "",
  readonly = false,
  required = false,
  height = "h-[48px]",
  border = "border-2",
}) => {
  return (
    <div>
      <div className="font-sans text-gray font-body tracking-wide text-sm min-w-md">
        {children}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        onChange={(e) => onChange(e)}
        defaultValue={defaultValue}
        disabled={readonly}
        required={required}
        placeholder={placeHolder}
        className={`w-full ${height}  ${border} py-1 px-2  rounded-md border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
      />
    </div>
  );
};

export const TextArea = ({
  children,
  type,
  id,
  name,
  defaultValue = "",
  readonly = false,
  required = false,
  handleChange,
}) => {
  return (
    <div>
      <textarea
        type={type}
        id={id}
        name={name}
        onChange={(e) => handleChange(e)}
        disabled={readonly}
        required={required}
        defaultValue={defaultValue}
        className="border-gray-200 border focus:outline-none focus:ring-0 rounded-md px-6 py-12 w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
      />
      {children}
    </div>
  );
};
export const TextField = ({
  label = "",
  name = "",
  id = "",
  height = "h-[48px]",
  width="w-[378px]",
  textsize = "text-sm",
  type = "text",
  required = null,
  bgColor = "",
  labelColor ="textColor",
  roundedText = "rounded-[4px]",
  roundedPassword = "rounded-lg",
  placeHolder = "",
  className = "",
  value,
  disabled = false,
  max = "2030-01-01",
  min = "1980-01-01",
  error = null,
  isRead = false,
  onChange = (e) => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const show = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  // console.log("##### : ", error);

  return (
    <div
      className={`flex flex-col gap-0.5 py-1 2xl:gap-1 2xl:py-2  ${className}`}>
        <p className={`select-none font-normal flex text-sm text-${labelColor}`}>
        {label}
        {required && <div className="text-red-500">*</div>}
      </p>
      {type === "password" ? (
        <div className="relative">
          <motion.input
            height={height}
            width={width}
            name={name}
            type={showPassword ? "text" : "password"}
            value={value}
            placeholder={placeHolder}
            onChange={(e) => onChange(e)}
            className={classNames(
              `${bgColor}  border-[1px] rounded px-3 py-[7.5px] ${height} active:outline-none w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
              {
                "border-red-600 focus:outline-none": error,
                "border-gray-300": !error,
              }
            )}
            whileTap={{ y: 3 }}
            required={required}
            disabled={disabled}
            max={max}
            min={min}
          />
          <div
            className="absolute right-3 bottom-3"
            onMouseDownCapture={(e) => show(e)}>
            {/* {showPassword ? ( */}
            {/*  <BsEyeSlashFill color="gray" /> */}
            {/* ) : ( */}
            {/*  <BsEyeFill color="gray" /> */}
            {/* )} */}
          </div>
        </div>
      ) : (
        <motion.input
          name={name}
          id={id}
          type={type}
          textsize={textsize}
          value={value}
          height={height}
          // defaultValue={value}
          placeholder={placeHolder}
          onChange={(e) => onChange(e)}
          className={classNames(
            `${bgColor}  border-[1px] rounded px-3 py-[7.5px]  ${height} active:outline-none w-full ${textsize} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
            {
              "border-red-600 focus:outline-none": error,
              "border-gray-300": !error,
            }
          )}
          // whileTap={{ y: 3 }}
          required={required}
          disabled={disabled}
          max={max}
          min={min}
          readOnly={isRead}
        />
      )}
      {/* {error && <Error data={error} />} */}
    </div>
  );
};

export const TextInputArea = ({
  label = "",
  name = "",
  id = "",
  textsize = "text-sm",
  type = "text",
  required = null,
  placeHolder = "",
  className = "",
  bgColor = "white",
  rows = "4",
  value = "",
  disabled = false,
  max = "2004-01-01",
  min = "1980-01-01",
  error = null,
  onChange = (e) => {},
}) => {
  return (
    <div
      className={`flex flex-col gap-0.5 py-1 2xl:gap-1 2xl:py-2  ${className}`}>
      <p className="select-none font-normal flex text-sm text-textColor">
        {label}
        {required}
        {/* {required && <div className="text-red-500">*</div>} */}
      </p>

      <motion.textarea
        name={name}
        id={id}
        type={type}
        textsize={textsize}
        rows={rows}
        value={value}
        placeholder={placeHolder}
        onChange={(e) => onChange(e)}
        className={classNames(
          `${bgColor}  border-[1px] rounded px-3 py-[7.5px]  active:outline-none w-full ${textsize} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`,
          {
            "border-red-600 focus:outline-none": error,
            "border-gray-200": !error,
          }
        )}
        // whileTap={{ y: 3 }}
        required={required}
        disabled={disabled}
        // max={max}
        // min={min}
      />

      {/* {error && <Error data={error} />} */}
    </div>
  );
};

export const CustomSelect = ({
    id,
    children,
    onChange ,
    label,
    name,
    required = false,
    bgColor = 'white',
    disabled = false,
    className ,
    selectHeight ="",
    value,
  }) => {
  return (
  <div className={`flex  flex-col py-1 2xl:py-2 gap-0.5 2xl:gap-1 ${className}`}>
  <div className="font-normal  text-sm text-textColor">{label}</div>
      <select
      required={required}
      id={id}
      name={name}
      value={value}
      className={` px-1 ${selectHeight} rounded border-[1px] p-6 py-[12px] active:outline-none w-full ${bgColor} focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
      onChange={onChange}
      disabled={disabled}
      >
      {children}
      </select>
  </div>
  );
};


export const RadioButton = ({ label, options, selectedOption, onChange, 
  name = "",
  id = "",
  height = "h-auto",
  textsize = "text-sm",
  type = "text",
  required = null,
  bgColor = "",
  labelColor = "#666666",
  roundedText = "rounded-[4px]",
  roundedPassword = "rounded-lg",
  placeHolder = "",
  className = "",
  value,
  disabled = false,
  max = "2030-01-01",
  min = "1980-01-01",
  error = null,
  isRead = false,
}) => {
  console.log(selectedOption);

  return (
    <>
      <div > 
        <label className='text-slate-400 text-xs '>{label}</label>

        <div className="flex">
          {options.map((option) => (
            <label key={option} className="flex items-center mr-8 mt-2">
              <motion.input
                className={classNames(
                  `${bgColor}  ${height}  ${textsize} focus:outline-none   focus:border-transparent mr-2`,
                )}
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
     </div>
     </>
  )
                }
     






export default Text;
