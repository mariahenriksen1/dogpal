import React from "react";
import "./PreviewImage.modules.css"; // Import the CSS file

interface PreviewImageProps {
  src: string;
  alt: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} className="profile-picture-preview" />;
};

export default PreviewImage;
