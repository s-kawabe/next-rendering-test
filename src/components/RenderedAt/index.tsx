type RenderedAtProps = {
  time?: string
  render?: 'csr' | 'ssr' | 'ssg' | 'isr'
}

const RenderingName = {
  csr: { abbr: 'CSR', name: 'Client Side Rendering' },
  ssr: { abbr: 'SSR', name: 'Server Side Rendering' },
  ssg: { abbr: 'SSG', name: 'Static Side Rendering' },
  isr: { abbr: 'ISR', name: 'Incremental Static Regeneration' },
}

const Please = () => {
  return <p>Press the Button</p>
}

export const RenderedAt = (props: RenderedAtProps) => {
  if (!props.render) {
    return <Please />
  }

  return (
    <div>
      <h2>{RenderingName[props.render].abbr}</h2>
      <p>{RenderingName[props.render].name}</p>
      <p>
        Rendered at:&nbsp;
        {props.time ? <span>{props.time}</span> : <span>...</span>}
      </p>
    </div>
  )
}
