import Image from 'next/image'

export const RenderIcon = () => {
  return (
    <div
      style={{
        boxShadow: '0 10px 25px 0 rgba(0, 0, 0, .5)',
        margin: 30,
      }}
    >
      <Image src="/image.png" alt="Render Picture" width={900} height={600} />
    </div>
  )
}
