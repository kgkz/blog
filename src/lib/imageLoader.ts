export default function imageLoader({
  src,
  width,
  height,
  quality,
}: {
  src: string
  width?: number
  height?: number
  quality?: number
}) {
  return `${src}?fm=webp&w=${width}&h=${height}&q=${quality || 75}`
}
