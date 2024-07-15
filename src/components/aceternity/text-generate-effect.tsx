'use client'
import { useEffect } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string
  className?: string
}) => {
  const [scope, animate] = useAnimate()
  let wordsArray = words.split(' ')
  // first 3 words in 1 array
  let firstArray = wordsArray.slice(0, 3)
  // second 3 words in another array
  let secondArray = wordsArray.slice(3, 7)
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    )
  }, [scope.current])

  const renderWords = () => {
    return (
      <main className="flex">
        <motion.div ref={scope}>
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                className={cn(
                  'opacity-0',
                  idx > 6 ? 'text-purple' : 'text-black dark:text-white',
                  // idx === 2 && "mr-96"
                )}
              >
                {word}{' '}
              </motion.span>
            )
          })}
        </motion.div>
      </main>
    )
  }

  return (
    <div className={cn('font-bold', className)}>
      <div className="my-4">
        <div className="leading-snug tracking-wide text-black dark:text-white">
          {renderWords()}
        </div>
      </div>
    </div>
  )
}
