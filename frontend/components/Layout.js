import Container from 'react-bootstrap/Container'

import Menu from './Menu'

import 'bootstrap/dist/css/bootstrap.css'

const Layout = props => (
  <>
    <Menu />
    <Container style={{ marginTop: '20px' }}>
      {props.children}
    </Container>
  </>
)

export default Layout
