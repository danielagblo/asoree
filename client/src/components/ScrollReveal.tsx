import React, { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  threshold?: number
  once?: boolean
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
  threshold = 0.15,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(40px)'
        case 'down': return 'translateY(-40px)'
        case 'left': return 'translateX(40px)'
        case 'right': return 'translateX(-40px)'
        case 'none': return 'none'
      }
    }
    return 'translate(0)'
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isVisible ? 'scroll-reveal-visible' : ''} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
