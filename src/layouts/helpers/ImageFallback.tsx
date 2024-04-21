/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useEffect, useState } from "react";

const ImageFallback = ({
  width,
  height,
  alt,
  className,
  src

}: {
  width: string | any;
  height: string | any;
  alt: any,
  className: string | any;
  src: string | any;

}) => {


  return (
    <img
      alt={alt}
      src={src}
      className={className}
      width={width}
      height={height}
    />
  );
};

export default ImageFallback;
