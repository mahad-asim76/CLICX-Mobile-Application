import * as React from "react"
import Svg, { Defs, ClipPath, Path, G } from "react-native-svg"

export function SvgEyeHide(props) {
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >
        <Path
            d="M6.313 10.187a.495.495 0 01-.353-.147A2.87 2.87 0 015.113 8 2.888 2.888 0 018 5.113c.767 0 1.493.3 2.04.847a.5.5 0 010 .707L6.667 10.04c-.1.1-.227.147-.354.147zM8 6.113a1.89 1.89 0 00-1.64 2.82L8.933 6.36c-.28-.16-.6-.247-.933-.247z"
            fill="#696E7B"
        />
        <Path
            d="M3.733 12.34a.508.508 0 01-.326-.12 9.674 9.674 0 01-1.9-2.22C.8 8.9.8 7.107 1.507 6 3.133 3.453 5.5 1.987 8 1.987c1.467 0 2.913.506 4.18 1.46a.5.5 0 01-.6.8C10.487 3.42 9.247 2.987 8 2.987c-2.153 0-4.213 1.293-5.653 3.553-.5.78-.5 2.14 0 2.92.5.78 1.073 1.453 1.706 2 .207.18.234.493.054.707a.484.484 0 01-.374.173zM8 14.013c-.887 0-1.753-.18-2.587-.533a.5.5 0 01.387-.92c.707.3 1.447.453 2.193.453 2.154 0 4.214-1.293 5.654-3.553.5-.78.5-2.14 0-2.92a9.485 9.485 0 00-.674-.933.506.506 0 01.074-.707.5.5 0 01.706.073c.26.32.514.667.74 1.027.707 1.1.707 2.893 0 4C12.867 12.547 10.5 14.013 8 14.013z"
            fill="#696E7B"
        />
        <Path
            d="M8.46 10.847a.505.505 0 01-.493-.407.49.49 0 01.4-.58 1.88 1.88 0 001.48-1.48.506.506 0 01.586-.4.5.5 0 01.4.587 2.865 2.865 0 01-2.28 2.28c-.033-.007-.06 0-.093 0zM1.333 15.167a.495.495 0 01-.353-.147.503.503 0 010-.707l4.98-4.98a.503.503 0 01.707 0 .503.503 0 010 .707l-4.98 4.98c-.1.1-.227.147-.354.147zM9.687 6.813a.494.494 0 01-.354-.146.503.503 0 010-.707l4.98-4.98a.503.503 0 01.707 0 .503.503 0 010 .707l-4.98 4.98c-.1.1-.227.146-.353.146z"
            fill="#696E7B"
        />
    </Svg>
    )
}

export function SvgEyeView(props) {
    return (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        >    
        <Path
            d="M8 11.387a2.888 2.888 0 010-5.774 2.888 2.888 0 010 5.774zm0-4.774A1.89 1.89 0 006.113 8.5 1.89 1.89 0 008 10.387 1.89 1.89 0 009.887 8.5 1.89 1.89 0 008 6.613z"
            fill="#696E7B"
        />
        <Path
            d="M8 14.513c-2.507 0-4.873-1.466-6.5-4.013-.707-1.1-.707-2.893 0-4 1.633-2.547 4-4.013 6.5-4.013s4.867 1.466 6.493 4.013c.707 1.1.707 2.893 0 4C12.867 13.047 10.5 14.513 8 14.513zM8 3.487c-2.153 0-4.213 1.293-5.653 3.553-.5.78-.5 2.14 0 2.92 1.44 2.26 3.5 3.553 5.653 3.553 2.153 0 4.213-1.293 5.653-3.553.5-.78.5-2.14 0-2.92-1.44-2.26-3.5-3.553-5.653-3.553z"
            fill="#696E7B"
        />
    </Svg>
    )
}

export function SvgBack(props) {
    return (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width}
        height={props.height}
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
        viewBox="0 0 298 511.93"
        {...props}
      >
        <Path
          fillRule="nonzero"
          d="M285.77 441c16.24 16.17 16.32 42.46.15 58.7-16.16 16.24-42.45 16.32-58.69.16l-215-214.47c-16.24-16.16-16.32-42.45-.15-58.69L227.23 12.08c16.24-16.17 42.53-16.09 58.69.15 16.17 16.24 16.09 42.54-.15 58.7l-185.5 185.04L285.77 441z"
          fill="#152E57"
        />
    </Svg>
    )
}