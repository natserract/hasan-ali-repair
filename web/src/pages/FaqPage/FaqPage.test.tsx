import { render } from '@redwoodjs/testing/web'

import FaqPage from './FaqPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('FaqPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FaqPage />)
    }).not.toThrow()
  })
})
