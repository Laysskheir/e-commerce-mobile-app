import React from "react";
import { Path, Svg, SvgProps, G, Circle } from "react-native-svg";

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
}
const Icons = {
  Google: ({ size = 24, color = "#ffffff", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#FFC107"
      />
      <Path
        d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
        fill="#FF3D00"
      />
      <Path
        d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
        fill="#4CAF50"
      />
      <Path
        d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
        fill="#1976D2"
      />
    </Svg>
  ),
  Facebook: ({ size = 24, color = "#1877F2", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
        fill={color}
      />
    </Svg>
  ),
  Eye: ({ size = 24, color = "#ffffff", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G fill="none" stroke="currentColor" strokeWidth="1.5" color={color}>
        <Path
          d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"
          color={color}
        ></Path>
        <Path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" color={color}></Path>
      </G>
    </Svg>
  ),

  EyeOff: ({ size = 24, color = "#ffffff", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        fill="currentColor"
        d="M2.69 6.705a.75.75 0 0 0-1.38.59zm12.897 6.624l-.274-.698zm-6.546.409a.75.75 0 1 0-1.257-.818zm-2.67 1.353a.75.75 0 1 0 1.258.818zM22.69 7.295a.75.75 0 0 0-1.378-.59zM19 11.13l-.513-.547zm.97 2.03a.75.75 0 1 0 1.06-1.06zm-8.72 3.34a.75.75 0 0 0 1.5 0zm5.121-.591a.75.75 0 1 0 1.258-.818zm-10.84-4.25A.75.75 0 0 0 4.47 10.6zm-2.561.44a.75.75 0 0 0 1.06 1.06zM12 13.25c-3.224 0-5.539-1.605-7.075-3.26a13.6 13.6 0 0 1-1.702-2.28a12 12 0 0 1-.507-.946l-.022-.049l-.004-.01l-.001-.001L2 7l-.69.296h.001l.001.003l.003.006l.04.088q.039.088.117.243c.103.206.256.496.462.841c.41.69 1.035 1.61 1.891 2.533C5.54 12.855 8.224 14.75 12 14.75zm3.313-.62c-.97.383-2.071.62-3.313.62v1.5c1.438 0 2.725-.276 3.862-.723zm-7.529.29l-1.413 2.17l1.258.818l1.412-2.171zM22 7l-.69-.296h.001v.002l-.007.013l-.028.062a12 12 0 0 1-.64 1.162a13.3 13.3 0 0 1-2.15 2.639l1.027 1.094a14.8 14.8 0 0 0 3.122-4.26l.039-.085l.01-.024l.004-.007v-.003h.001v-.001zm-3.513 3.582c-.86.806-1.913 1.552-3.174 2.049l.549 1.396c1.473-.58 2.685-1.444 3.651-2.351zm-.017 1.077l1.5 1.5l1.06-1.06l-1.5-1.5zM11.25 14v2.5h1.5V14zm3.709-.262l1.412 2.171l1.258-.818l-1.413-2.171zm-10.49-3.14l-1.5 1.5L4.03 13.16l1.5-1.5z"
        color={color}
      ></Path>
    </Svg>
  ),

  ArrowRight: ({ size = 24, color = "#ffffff", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M4 12h16m0 0l-6-6m6 6l-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        color={color}
      />
    </Svg>
  ),
  Bell: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <G
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color={color}
      >
        <Path
          d="M2.53 14.77c-.213 1.394.738 2.361 1.902 2.843c4.463 1.85 10.673 1.85 15.136 0c1.164-.482 2.115-1.45 1.902-2.843c-.13-.857-.777-1.57-1.256-2.267c-.627-.924-.689-1.931-.69-3.003C19.525 5.358 16.157 2 12 2S4.475 5.358 4.475 9.5c0 1.072-.062 2.08-.69 3.003c-.478.697-1.124 1.41-1.255 2.267"
          color={color}
        ></Path>
        <Path
          color={color}
          d="M8 19c.458 1.725 2.076 3 4 3c1.925 0 3.541-1.275 4-3"
        ></Path>
      </G>
    </Svg>
  ),
  Search: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.5 17.5L22 22m-2-11a9 9 0 1 0-18 0a9 9 0 0 0 18 0"
        color={color}
      ></Path>
    </Svg>
  ),
  Sliders: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 20v-6m0-3V4m4 4h6M2 14h6m8-2h6M12 8V4m0 16v-9m7 1V4m0 16v-5"
        color={color}
      ></Path>
    </Svg>
  ),
  Heart: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.624 4.424C3.965 5.182 2.75 6.986 2.75 9.137c0 2.197.9 3.891 2.188 5.343c1.063 1.196 2.349 2.188 3.603 3.154q.448.345.885.688c.526.415.995.778 1.448 1.043s.816.385 1.126.385s.674-.12 1.126-.385c.453-.265.922-.628 1.448-1.043q.437-.344.885-.687c1.254-.968 2.54-1.959 3.603-3.155c1.289-1.452 2.188-3.146 2.188-5.343c0-2.15-1.215-3.955-2.874-4.713c-1.612-.737-3.778-.542-5.836 1.597a.75.75 0 0 1-1.08 0C9.402 3.882 7.236 3.687 5.624 4.424M12 4.46C9.688 2.39 7.099 2.1 5 3.059C2.786 4.074 1.25 6.426 1.25 9.138c0 2.665 1.11 4.699 2.567 6.339c1.166 1.313 2.593 2.412 3.854 3.382q.43.33.826.642c.513.404 1.063.834 1.62 1.16s1.193.59 1.883.59s1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16q.396-.312.826-.642c1.26-.97 2.688-2.07 3.854-3.382c1.457-1.64 2.567-3.674 2.567-6.339c0-2.712-1.535-5.064-3.75-6.077c-2.099-.96-4.688-.67-7 1.399"
        clipRule="evenodd"
        color={color}
      ></Path>
    </Svg>
  ),
  HeartFilled: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2 9.137C2 14 6.02 16.591 8.962 18.911C10 19.729 11 20.5 12 20.5s2-.77 3.038-1.59C17.981 16.592 22 14 22 9.138S16.5.825 12 5.501C7.5.825 2 4.274 2 9.137"
        color={color}
      ></Path>
    </Svg>
  ),
  Home: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 18v-3m-9.648-1.786c-.354-2.298-.53-3.446-.096-4.465s1.398-1.715 3.325-3.108L7.021 4.6C9.418 2.867 10.617 2 12.001 2c1.382 0 2.58.867 4.978 2.6l1.44 1.041c1.927 1.393 2.89 2.09 3.325 3.108c.434 1.019.258 2.167-.095 4.464l-.301 1.96c-.5 3.256-.751 4.884-1.919 5.856S16.554 22 13.14 22h-2.28c-3.415 0-5.122 0-6.29-.971c-1.168-.972-1.418-2.6-1.918-5.857z"
        color={color}
      ></Path>
    </Svg>
  ),
  User: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-7.35 16.76a10 10 0 0 0 14.7 0A10 10 0 0 0 12 2m0 18a8 8 0 0 1-5.55-2.25a6 6 0 0 1 11.1 0A8 8 0 0 1 12 20m-2-10a2 2 0 1 1 2 2a2 2 0 0 1-2-2m8.91 6A8 8 0 0 0 15 12.62a4 4 0 1 0-6 0A8 8 0 0 0 5.09 16A7.9 7.9 0 0 1 4 12a8 8 0 0 1 16 0a7.9 7.9 0 0 1-1.09 4"
        color={color}
      ></Path>
    </Svg>
  ),
  ShoppingCart: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.873 17.02L2.669 9.84c-.182-1.086-.273-1.628.019-1.984c.291-.356.827-.356 1.898-.356h14.828c1.071 0 1.607 0 1.898.356c.292.356.2.898.019 1.984l-1.204 7.18c-.399 2.38-.598 3.569-1.413 4.275C17.9 22 16.726 22 14.378 22H9.622c-2.348 0-3.522 0-4.336-.706c-.815-.705-1.014-1.895-1.413-4.275M17.5 7.5a5.5 5.5 0 1 0-11 0"
        color={color}
      ></Path>
    </Svg>
  ),
  X: ({ size = 24, color = "black", ...props }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19 5L5 19M5 5l14 14"
        color={color}
      ></Path>
    </Svg>
  ),
};

export default Icons;
