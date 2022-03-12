import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const EditVehiclePage = () => {
  return (
    <>
      <MetaTags title="EditVehicle" description="EditVehicle page" />

      <h1>EditVehiclePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/EditVehiclePage/EditVehiclePage.tsx</code>
      </p>
      <p>
        My default route is named <code>editVehicle</code>, link to me with `
      </p>
    </>
  )
}

export default EditVehiclePage
