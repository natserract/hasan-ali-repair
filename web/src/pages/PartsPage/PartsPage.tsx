import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const PartsPage = () => {
  return (
    <>
      <MetaTags title="Parts" description="Parts page" />

      <h1>PartsPage</h1>
      <p>
        Find me in <code>./web/src/pages/PartsPage/PartsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>parts</code>, link to me with `
      </p>
    </>
  )
}

export default PartsPage
