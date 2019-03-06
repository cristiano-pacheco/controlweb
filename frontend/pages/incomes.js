import Layout from '../components/Layout'
import IncomesGrid from '../components/IncomesGrid'
import 'isomorphic-fetch'

const Incomes = ({ incomes }) => (
    <Layout>
      <IncomesGrid incomes={incomes} />
    </Layout>
)

Incomes.getInitialProps = async () => {
  const response = await fetch('http://localhost:3333/api/incomes')
  const incomes = await response.json()
  return { incomes }
}

export default Incomes
