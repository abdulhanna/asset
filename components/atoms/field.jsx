import classNames from 'classnames';
import { useState } from 'react';
import { motion } from 'framer-motion';
const Text = ({
    children,
    size = 'md',
    weight = 'normal',
    color = 'black',
    colorWeight = '4x',
    classname = '',
  }) => {
    return (
      <div
        className={classNames(`
        ${
          {
            xs: 'text-[10px] 2xl:text-[12px]',
            sm: 'text-[12px] 2xl:text-[14px]',
            md: 'text-[14px] 2xl:text-[16px]',
            lg: 'text-[16px] 2xl:text-[18px]',
            xl: 'text-[18px] 2xl:text-[22px]',
            '2xl': 'text-[22px] 2xl:text-[26px]',
          }[size]
        }
        ${
          {
            light: 'font-thin',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
          }[weight]
        },
        ${
          {
            '1x': `text-${color}-100`,
            '2x': `text-${color}-200`,
            '3x': `text-${color}-300`,
            '4x': `text-${color}-400`,
            '5x': `text-${color}-500`,
           '6x': `text-${color}-600`,
           '7x': `text-${color}-700`,
           '8x': `text-${color}-800`,
           '9x': `text-${color}-900`,
        }[colorWeight]
      }
      font-lato tracking-wide ${classname}
    `)}
    >
      {children}
    </div>
  );
};
export const Text1 = ({
    children,
    size = 'md',
    weight = 'normal',
  //   color = 'slate',
    // colorWeight = '3x',
    color = 'text-black-300',
    className = '',
  }) => {
    return (
      <div
        className={classNames(
          {
            'text-xs': size === 'xs',
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
            'text-xl': size === 'xl',
            'text-2xl': size === '2xl',
          },
          {
            'font-light': weight === 'light',
            'font-normal': weight === 'normal',
            'font-medium': weight === 'medium',
            'font-semibold': weight === 'semibold',
            'font-bold': weight === 'bold',
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
          'font-lato',
          'tracking-wide',
          className
        )}
      >
        {children}
       
      </div>
    );
  };


  export const InputField = ({
    children,
    type,
    id,
    handleChange,
    name,
    defaultValue = '',
    readonly = false,
    required = false,
  }) => {
    return (
      <div>
        <div className="font-sans text-gray font-medium tracking-wide text-sm min-w-md">
          {children}
        </div>
        <input
          type={type}
          id={id}
          name={id}
          onChange={(e) => handleChange(e)}
          defaultValue={defaultValue}
          disabled={readonly}
          required={required}
          className="w-full  border py-1 px-2 text-background rounded-md border-gray-200 focus:outline-none focus:ring-0 "
        />
      </div>
    );
  };


  export const TextArea = ({
    children,
    type,
    id,
    name,
    handleChange,
    defaultValue = '',
    readonly = false,
    required = false,
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
          className="border-gray-200 border focus:outline-none focus:ring-0 rounded-md px-6 py-12 w-full"
        />
        {children}
      </div>
    );
  };
  
  export const TextField = ({
    label = '',
    name = '',
    id = '',
    textsize = 'text-sm',
    type = 'text',
    required = null,
    bgColor = 'white',
    placeHolder = '',
    className = '',
    value,
    disabled = false,
    max = '2030-01-01',
    min = '1980-01-01',
    error = null,
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
        className={`flex flex-col gap-0.5 py-1 2xl:gap-1 2xl:py-2  ${className}`}
      >
        <p className="select-none font-normal flex text-sm text-textColor">
          {label}
          {required && <div className="text-red-500">*</div>}
        </p>
        {type === 'password' ? (
          <div className="relative">
            <motion.input
              name={name}
              type={showPassword ? 'text' : 'password'}
              // value={value}
              placeholder={placeHolder}
              onChange={(e) => onChange(e)}
              className={classNames(
                `bg-fieldBg border border-[1px] rounded-lg px-3 py-[7.5px] active:outline-none w-full`,
                {
                  'border-red-600 focus:outline-none': error,
                  'border-gray-200': !error,
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
              onMouseDownCapture={(e) => show(e)}
            >
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
            // defaultValue={value}
            placeholder={placeHolder}
            onChange={(e) => onChange(e)}
            className={classNames(
              `${bgColor} border border-[1px] rounded px-3 py-[7.5px] h-10 active:outline-none w-full ${textsize}`,
              {
                'border-red-600 focus:outline-none': error,
                'border-gray-200': !error,
              }
            )}
            // whileTap={{ y: 3 }}
            required={required}
            disabled={disabled}
            max={max}
            min={min}
          />
        )}
        {/* {error && <Error data={error} />} */}
      </div>
    );
  };

  export const TextInputArea = ({
    label = '',
    name = '',
    id = '',
    textsize = 'text-sm',
    type = 'text',
    required = null,
    placeHolder = '',
    className = '',
    bgColor = 'white',
    rows = '4',
    value = '',
    disabled = false,
    max = '2004-01-01',
    min = '1980-01-01',
    error = null,
    onChange = (e) => {},
  }) => {
    return (
      <div
        className={`flex flex-col gap-0.5 py-1 2xl:gap-1 2xl:py-2  ${className}`}
      >
        <p className="select-none font-normal flex text-sm text-textColor">
          {label}
          {required && <div className="text-red-500">*</div>}
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
            `${bgColor} border border-[1px] rounded px-3 py-[7.5px]  active:outline-none w-full ${textsize}`,
            {
              'border-red-600 focus:outline-none': error,
              'border-gray-200': !error,
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

 export default Text