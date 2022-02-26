import { render } from '@redwoodjs/testing/web'

import MechanicsPage from './MechanicsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MechanicsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MechanicsPage />)
    }).not.toThrow()
  })
})
