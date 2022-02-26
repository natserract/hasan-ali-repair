import { render } from '@redwoodjs/testing/web'

import ServicesPage from './ServicesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ServicesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ServicesPage />)
    }).not.toThrow()
  })
})
