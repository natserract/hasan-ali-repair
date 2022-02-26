import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const VehiclesPage = () => {
  return (
    <>
      <MetaTags title="Vehicles" description="Vehicles page" />

      <h1>VehiclesPage</h1>
      <p>
        Find me in <code>./web/src/pages/VehiclesPage/VehiclesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>vehicles</code>, link to me with `
      </p>
    </>
  )
}

export default VehiclesPage
