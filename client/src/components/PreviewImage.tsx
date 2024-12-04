import React from "react";

interface PreviewImageProps {
  src: string;
  alt: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ src, alt }) => {
  return <img src={src} alt={alt} style={{ width: "100px", marginTop: "10px" }} />;
};

export default PreviewImage;
