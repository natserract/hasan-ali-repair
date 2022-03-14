import { render } from '@redwoodjs/testing/web'

import CreatePartPage from './CreatePartPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreatePartPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreatePartPage />)
    }).not.toThrow()
  })
})
