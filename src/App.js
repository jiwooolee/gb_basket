import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout, Row, Spin } from 'antd';
const { Content } = Layout;

const InitPage = lazy(() => import('./Page/InitPage'));
const TeamSettingPage = lazy(() => import('./Page/TeamSettingPage'));
const GamePage = lazy(() => import('./Page/GamePage'));

const App = () => {
  return (
      <Router>
          <Suspense fallback={<Row justify='center' align='middle' style={{minHeight: '100vh'}}><Spin size="large"/></Row>}>
              <Layout style={{ minHeight: '100vh'}}>
                  <Content style={{paddingLeft: '5px', paddingRight: '5px'}}>
                      <Routes>
                          <Route exact path='/' element={<InitPage/>}/>
                          <Route exact path='/team' element={<TeamSettingPage/>}/>
                          <Route exact path='/game' element={<GamePage/>}/>
                      </Routes>
                  </Content>
              </Layout>
          </Suspense>
      </Router>
  );
}

export default App;
