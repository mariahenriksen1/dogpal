import React from "react";
import "./PreviewImage.modules.css";

interface PreviewImageProps {
  src: string;
  alt: string;
  pictureSize?: string; // Add pictureSize prop
  border?: string; // Add border prop
  verticalOffset?: string; // New verticalOffset prop
  className?: string;
  onError?: () => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  src,
  alt,
  pictureSize,
  border,
  verticalOffset,
  className,
  onError,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`picture-preview ${className}`}
      onError={onError}
      style={{
        width: pictureSize,
        height: pictureSize,
        border,
        position: "relative",
        top: verticalOffset, // Apply the vertical offset
      }}
    />
  );
};

export default PreviewImage;
