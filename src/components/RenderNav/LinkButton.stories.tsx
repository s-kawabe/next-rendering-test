import { Box } from '@chakra-ui/react'
import type { Meta } from '@storybook/react/types-6-0'
import type { Story } from '@storybook/react/types-6-0'

import type { LinkButtonProps } from '@/components/RenderNav/LinkButton'
import { LinkButton } from '@/components/RenderNav/LinkButton'

// default export storybook内のカテゴリ分けや、対象のコンポーネントを指定
// eslint-disable-next-line import/no-default-export
export default {
  title: 'atoms/Card',
  component: LinkButton,
} as Meta

// Template 基礎となるコンポーネントスタイル
const Template: Story<LinkButtonProps> = (args) => {
  return (
    // トップタグはBoxなどでラッピングする必要あり？
    <Box w={64} h={64}>
      <LinkButton {...args} />
    </Box>
  )
}

// named export Templateを基礎としたいろいろなバリエーションの
// スタイルを生成する
export const Csr = Template.bind({})
Csr.args = {
  text: 'CSR',
  href: '/rendering/csr',
  color: 'teal',
} as LinkButtonProps

export const Ssr = Template.bind({})
Ssr.args = {
  text: 'SSR',
  href: '/rendering/ssr',
  color: 'orange',
}

export const Ssg = Template.bind({})
Ssg.args = {
  text: 'SSG',
  href: '/rendering/ssg',
  color: 'yellow',
}

export const Isr = Template.bind({})
Isr.args = {
  text: 'ISR',
  href: '/rendering/isr',
  color: 'green',
}
