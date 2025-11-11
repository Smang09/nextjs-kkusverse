import { ComponentType } from 'react'
import MdxImage from './Image'
import * as Text from './Text'
import * as Table from './Table'
import * as Custom from './Custom'
import InfiniteVirtualScroll from '../post/InfiniteVirtualScroll'
import BottomSheetButton from '../post/BottomSheetButton'

const mapKeys = <T extends Record<string, ComponentType>>(obj: T) => {
  const mapped: Record<string, ComponentType> = {}
  for (const [key, value] of Object.entries(obj)) {
    mapped[key.toLowerCase()] = value
  }
  return mapped
}

const MDXComponents = {
  Image: MdxImage,
  ...mapKeys(Text),
  ...mapKeys(Table),
  ...Custom,
  InfiniteVirtualScroll,
  BottomSheetButton,
}

export default MDXComponents
