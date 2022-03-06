import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CreateSchedulePage = () => {
  return (
    <>
      <MetaTags title="CreateSchedule" description="CreateSchedule page" />

      <h1>CreateSchedulePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CreateSchedulePage/CreateSchedulePage.tsx</code>
      </p>
      <p>
        My default route is named <code>createSchedule</code>, link to me with `
      </p>
    </>
  )
}

export default CreateSchedulePage
