import { render } from '@redwoodjs/testing/web'

import CreateUserPage from './CreateUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateUserPage />)
    }).not.toThrow()
  })
})
