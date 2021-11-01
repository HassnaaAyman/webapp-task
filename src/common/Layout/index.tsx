import { Layout as AntdLayout, Menu } from "antd";

const { Header, Content, Footer } = AntdLayout;

const Layout: React.FC = ({ children }) => {
  return (
    <AntdLayout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Webapp Task</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        {children}
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </AntdLayout>
  );
};

export default Layout;
