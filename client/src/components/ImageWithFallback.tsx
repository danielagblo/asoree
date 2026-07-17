import React, { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallback = 'https://placehold.co/600x800/f2f2f2/555555?text=No+Image',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  )
}
