// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import type { Meta, Story } from '@storybook/react/types-6-0'

import * as HeaderStories from './Header.stories'
import type { PageProps } from './Page'
import { Page } from './Page'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Example/Page',
  component: Page,
} as Meta

const Template: Story<PageProps> = (args) => {
  return <Page {...args} />
}

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
}
