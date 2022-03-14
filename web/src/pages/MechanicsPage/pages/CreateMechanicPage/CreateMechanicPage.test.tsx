import { render } from '@redwoodjs/testing/web'

import CreateMechanicPage from './CreateMechanicPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateMechanicPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateMechanicPage />)
    }).not.toThrow()
  })
})
