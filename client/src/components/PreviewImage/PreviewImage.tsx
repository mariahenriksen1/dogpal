import React from "react";
import "./PreviewImage.modules.css"; // Import the CSS file

interface PreviewImageProps {
  src: string;
  alt: string;
  pictureSize?: string; // Add pictureSize prop
  onError?: () => void;
}

const PreviewImage: React.FC<PreviewImageProps> = ({
  src,
  alt,
  pictureSize,
  onError,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={"picture-preview"}
      onError={onError}
      style={{ width: pictureSize, height: pictureSize }} // Apply pictureSize dynamically
    />
  );
};

export default PreviewImage;
