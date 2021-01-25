import React from 'react';
import Layout from './components/layouts/Layout/layout';
import Sidebar from './components/layouts/Sidebar';
import Content from './components/layouts/Content';
import StreamServiceList from './components/StreamServiceList';
import Service from './components/Service';

const App = () => (
  <Layout>
    <Sidebar>
      <StreamServiceList />
    </Sidebar>
    <Content>
      <Service />
    </Content>
  </Layout>
);

export default App;
