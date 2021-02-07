// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import type { Meta, Story } from '@storybook/react/types-6-0'

import type { HeaderProps } from './Header'
import { Header } from './Header'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Example/Header',
  component: Header,
} as Meta

const Template: Story<HeaderProps> = (args) => {
  return <Header {...args} />
}

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  user: {},
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {}
