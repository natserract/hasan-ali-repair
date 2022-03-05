import { render } from '@redwoodjs/testing/web'

import CreateServicePage from './CreateServicePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateServicePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateServicePage />)
    }).not.toThrow()
  })
})
