import React, { useState,useCallback } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

function CustomAvatar({ src, alt ,size}) {
  const [loaded, setLoaded] = useState(false);
if(!size)size=40
  const handleImageLoaded = () => {
    console.log("image loaded");
    setLoaded(true);
  };

  // Load the image using Image object
  const loadImage = useCallback((src) => {
    const img = new Image();
    img.onload = handleImageLoaded;
    img.src = src;
  },[]);

  // Load the image when the component mounts
  React.useEffect(() => {
    loadImage(src);
  }, [src,loadImage]);

  return (
    <div className="custom-avatar">
      {loaded ? (
        <img
          src={src}
          alt={alt}
          style={{ width: size, height:size, borderRadius: "50%" }}
        />
      ) : (
        <Skeleton circle style={{ width: size, height: size, borderRadius: "50%" }} />
      )}
    </div>
  );
}

CustomAvatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default CustomAvatar;
