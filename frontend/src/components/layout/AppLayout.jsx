import { Layout } from 'antd'
import Navbar from './Navbar'
import Footer from './Footer'

const { Content } = Layout

const AppLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen flex flex-col">
      <Navbar />
      <Content className=" flex-1">{children}</Content>
      <Footer />
    </Layout>
  )
}

export default AppLayout
