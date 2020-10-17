import * as React from 'react';
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { RouteComponentProps, withRouter } from 'react-router';
import { Layout, Menu, Icon, notification } from 'antd';
import { ClickParam } from 'antd/lib/menu';

const DashBoardContainer: React.SFC<RouteComponentProps> = props => {
  
  const [data, setData] = useState(null);

  useEffect(() => {
      get_user_data();
  }, [])
  
  async function get_user_data() {
    let cart = await Auth.currentSession();
    setData(cart.getIdToken().payload['name']);
}
  
  const [collapsed, setCollapsed] = React.useState(false);
  const handleLogout = async (event: ClickParam) => {
    const { history } = props;
    try {
      await Auth.signOut({ global: true }).then(() => {
        history.push('/login');
      });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

  return (
    <Layout className="cover" id="app-header">
      <Layout.Sider className="cover" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={event => handleLogout(event)}>
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#ffffff', padding: 10}}>
          <Icon
           style={{ verticalAlign : 'super'}}
            className="trigger"
            onClick={() => setCollapsed(!collapsed)}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
          />
           <div
           style={{ verticalAlign : 'super',float:"right",paddingRight:10}}
           ><h1> Hi {data}</h1>
           </div>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#ffffff',
            minHeight: 280
          }}
        >
          <div className="text-center">
            <h1>Dashboard</h1>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(DashBoardContainer);
