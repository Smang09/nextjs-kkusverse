import Image from 'next/image'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
}

const MdxImage = ({ src, alt, width, height }: Props) => {
  return (
    <Image
      className="rounded-md my-6"
      src={`/posts/${src}`}
      alt={alt}
      width={width || 600}
      height={height || 600}
    />
  )
}

export default MdxImage
