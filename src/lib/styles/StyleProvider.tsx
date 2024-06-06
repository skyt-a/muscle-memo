'use client'

import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

export const StyleProvider = ({ children }: PropsWithChildren<{}>) => {
  return <NextUIProvider>{children}</NextUIProvider>
}
