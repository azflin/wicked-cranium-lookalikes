import React from "react";
import './App.scss';

const RenderSmoothImage = ({ src, alt = "notFound", objectFit = "contain", title }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isValidSrc, setIsValidSrc] = React.useState(!!src);

  return (
    <span className="smooth-image-wrapper">
      {isValidSrc ? (
        <img
          className={`smooth-image img-${imageLoaded ? "visible" : "hidden"} m-1`}
          title={title}
          style={{ objectFit }}
          src={src}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          onError={() => setIsValidSrc(false)}
        />
      ) : (
        <div className="smooth-no-image">{alt}</div>
      )}
      {isValidSrc && !imageLoaded && (
        <div className="smooth-preloader">
          <span className="loader" />
        </div>
      )}
    </span>
  );
};

export default RenderSmoothImage;