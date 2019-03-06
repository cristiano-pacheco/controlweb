import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = () => (
  <Navbar bg="light" variant="light">
    <Link href='/'>
      <Navbar.Brand>Controlweb</Navbar.Brand>
    </Link>
    <Nav className="mr-auto">
      <Link href='/incomes'>
        <Nav.Link href="/incomes">Incomes</Nav.Link>
      </Link>
      <Link href='/expenses'>
        <Nav.Link href="/expenses">Expenses</Nav.Link>
      </Link>
    </Nav>
  </Navbar>
)

export default Menu
