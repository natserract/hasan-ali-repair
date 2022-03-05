import { render } from '@redwoodjs/testing/web'

import SchedulesPage from './SchedulesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SchedulesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SchedulesPage />)
    }).not.toThrow()
  })
})
