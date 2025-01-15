import React from "react";
import "./PreviewImage.modules.css";

interface PreviewImageProps {
  src: string;
  alt: string;
  pictureSize?: string; // Add pictureSize prop
  border?: string; // Add border prop
  className?: string;
  onError?: () => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  src,
  alt,
  pictureSize,
  border,
  onError,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={"picture-preview"}
      onError={onError}
      style={{ width: pictureSize, height: pictureSize, border }} // Apply pictureSize and border dynamically
    />
  );
};

export default PreviewImage;
