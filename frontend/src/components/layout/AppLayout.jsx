import { Layout } from 'antd'
import Navbar from './Navbar'
import Footer from './Footer'

const { Content } = Layout

const AppLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen flex flex-col " style={{backgroundColor: "white"}}>
      {/* <Navbar /> */}
        <Content className="">{children}</Content>
      {/* <Footer /> */}
    </Layout>
  )
}

export default AppLayout
