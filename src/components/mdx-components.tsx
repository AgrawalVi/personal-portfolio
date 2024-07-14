import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { Callout } from './blog/post/callout'
import { cn } from '@/lib/utils'

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  Callout,
}

interface MDXProps {
  code: string
}

export function MDXContent({ code }: MDXProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
