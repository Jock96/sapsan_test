import { type ReactNode, createContext, useContext } from 'react'
import { useMediaQuery } from '../hooks'

export interface IMediaContext {
  mobile: boolean
  tablet: boolean
  desktop: boolean
}

const MediaContext = createContext<IMediaContext>({
  mobile: true,
  tablet: false,
  desktop: false,
})

const MediaContextProvider = ({ children }: { children: ReactNode }) => {
  const mobile = useMediaQuery('(max-width: 643px)');
  const tablet = useMediaQuery('(min-width: 640px) and (max-width: 1439px)');
  const desktop = useMediaQuery('(min-width: 1440px)');

  return (
    <MediaContext.Provider
      value={{ mobile, tablet, desktop }}
      children={children}
    />
  )
}

const useMediaContext = () => useContext(MediaContext)

export { MediaContextProvider, useMediaContext }
