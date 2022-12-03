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
  return `https://images.microcms-assets.io/assets/b6ac4a8d91df49e5bf670c6085140d55/${src}?fm=webp&w=${width}&h=${height}&q=${
    quality || 75
  }`
}
