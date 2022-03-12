import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ShowVehiclePage = () => {
  return (
    <>
      <MetaTags title="ShowVehicle" description="ShowVehicle page" />

      <h1>ShowVehiclePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ShowVehiclePage/ShowVehiclePage.tsx</code>
      </p>
      <p>
        My default route is named <code>showVehicle</code>, link to me with `
      </p>
    </>
  )
}

export default ShowVehiclePage
