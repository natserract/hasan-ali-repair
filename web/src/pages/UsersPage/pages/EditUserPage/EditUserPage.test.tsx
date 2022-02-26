import { render } from '@redwoodjs/testing/web'

import EditUserPage from './EditUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUserPage />)
    }).not.toThrow()
  })
})
