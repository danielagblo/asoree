import React, { useEffect, useRef, useState } from 'react'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.3,
  offset = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.scrollY - rect.top + window.innerHeight
        setScrollY(scrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const yOffset = scrollY * speed + offset

  return (
    <div
      ref={ref}
      className={`parallax-section ${className}`}
      style={{
        transform: `translateY(${yOffset * 0.1}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
