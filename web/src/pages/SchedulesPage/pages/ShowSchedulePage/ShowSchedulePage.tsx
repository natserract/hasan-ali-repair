import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ShowSchedulePage = () => {
  return (
    <>
      <MetaTags title="ShowSchedule" description="ShowSchedule page" />

      <h1>ShowSchedulePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ShowSchedulePage/ShowSchedulePage.tsx</code>
      </p>
      <p>
        My default route is named <code>showSchedule</code>, link to me with `
      </p>
    </>
  )
}

export default ShowSchedulePage
