import React, { Children } from 'react'
import classNames from 'classnames'

const Button = ({ href, children, className, size = 'md', variant = "primary", onClick }) => {
    const content = <>
        {children}
    </>
    if (href) {
        return (
            <Link href={href}>
                <button className={classNames(`${{
                    'xs': 'text-[10px] 2xl:text-[12px]',
                    'sm': 'text-[12px] 2xl:text-[14px]',
                    'md': 'text-[14px] 2xl:text-[16px]',
                    'lg': 'text-[16px] 2xl:text-[18px]',
                    'xl': 'text-[18px] 2xl:text-[22px]',
                    'xl1': 'text-[20px] 2xl:text-[24px]',
                    '2xl': 'text-[22px] 2xl:text-[26px]',
                    '3xl': 'text-[24px] 2xl:text-[28px]',

                }[size]}font-Libre  px-5 py-2 text-center rounded`, className, {
                    "border-primary border  bg-transparent text-primary": variant === "primary",
                    "border border-black  bg-transparent ": variant === "primary1",
                    "bg-primary text-white": variant === "contained",

                })}>{content}</button>
            </Link>

        )
    }
    else {

        return <button className={classNames(`${{
            'xs': 'text-[10px] 2xl:text-[12px]',
            'sm': 'text-[12px] 2xl:text-[14px]',
            'md': 'text-[14px] 2xl:text-[16px]',
            'lg': 'text-[16px] 2xl:text-[18px]',
            'xl': 'text-[18px] 2xl:text-[22px]',
            'xl1': 'text-[20px] 2xl:text-[24px]',
            '2xl': 'text-[22px] 2xl:text-[26px]',
            '3xl': 'text-[24px] 2xl:text-[28px]',

        }[size]}font-Libre  px-5 py-2 text-center rounded`, className, {
            "border-primary border  bg-transparent text-primary": variant === "primary",
            "border border-black  bg-transparent ": variant === "primary1",
            "bg-primary text-white": variant === "contained",
            "bg-red-200 text-red-600 rounded-lg": variant === "red",
            "bg-yellow-600 text-white rounded-sm": variant === "yellow",
            "bg-teal-700 text-white rounded-sm": variant === "teal"
        })} onClick={onClick}>
            {content}
        </button>

    }
}


export default Button
