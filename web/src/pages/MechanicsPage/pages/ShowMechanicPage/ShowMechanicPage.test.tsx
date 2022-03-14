import { render } from '@redwoodjs/testing/web'

import ShowMechanicPage from './ShowMechanicPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShowMechanicPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShowMechanicPage />)
    }).not.toThrow()
  })
})
