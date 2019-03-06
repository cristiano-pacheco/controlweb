import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const IncomesGrid = ({ incomes }) => (
  <Card>
    <Card.Header as="h5">Incomes</Card.Header>
    <Card.Body>
      <Button className='float-right mb-3'>Add</Button>

      {!incomes && (
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Value</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan='4'>Nothing to show.</td>
          </tr>
        </tbody>
      </Table>)}

      {incomes && incomes.data.length > 0 && (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Value</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {incomes.data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.value}</td>
                <td>{item.operation_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card.Body>
  </Card>
)

export default IncomesGrid
