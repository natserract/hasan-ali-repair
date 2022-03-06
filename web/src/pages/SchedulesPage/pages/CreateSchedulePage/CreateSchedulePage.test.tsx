import { render } from '@redwoodjs/testing/web'

import CreateSchedulePage from './CreateSchedulePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateSchedulePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateSchedulePage />)
    }).not.toThrow()
  })
})
