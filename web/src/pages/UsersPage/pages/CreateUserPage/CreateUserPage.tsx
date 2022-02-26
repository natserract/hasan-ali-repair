import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const CreateUserPage = () => {
  return (
    <>
      <MetaTags title="CreateUser" description="CreateUser page" />

      <h1>CreateUserPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/CreateUserPage/CreateUserPage.tsx</code>
      </p>
      <p>
        My default route is named <code>createUser</code>, link to me with `
      </p>
    </>
  )
}

export default CreateUserPage
