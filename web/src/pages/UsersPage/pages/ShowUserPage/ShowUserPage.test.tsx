import { render } from '@redwoodjs/testing/web'

import ShowUserPage from './ShowUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowUserPage />)
    }).not.toThrow()
  })
})
