import react from "react"
import { Link } from 'react-router-dom';

import { Home, Construction, Task, Group, Security } from '@mui/icons-material';

export default function NavBar():react.ReactElement {
    return (
        <>
        <nav className='sidebar-nav'>
          <Link to="/">
            <Home/>
            Home
          </Link>
          <Link to="/projects">
            <Construction/>
            Projects
          </Link>
          <Link to="/tasks">
            <Task/>
            Tasks
          </Link>
          <Link to="/users">
            <Group/>
            Users
          </Link>
          <Link to="/role&permissions">
            <Security/>
            Role & Permissions
          </Link>
        </nav>
        </>
    )
}