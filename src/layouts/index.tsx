import { lazy } from 'react';
import { Route, Routes, useSearchParams } from 'react-router-dom';

import { lr, navigateTo } from '@/components/RouteUtils';
import { ScreenAdaptor } from '@/components/ScreenAdaptor';
import uiConfig from '@/ui.config.json';
import { getAuthToken, setAuthToken } from '@/utils/storage';

import { routeList } from './config';
export function AppLayout() {
  const [params] = useSearchParams();
  const token = params.get('token');
  let isLogin = !!getAuthToken() || true;


  if (!isLogin && token) {
    setAuthToken(token);
    isLogin = true;
  }

  return (
    <>
      {window.location.pathname === '/download' ? (
        <Routes>
          <Route path="/">
            <Route
              key={'download'}
              path={'download'}
              element={lr(lazy(() => import('@/pages/Download')))}
            />
            ;
          </Route>
        </Routes>
      ) :
        window.location.pathname === '/grid' ? (
          <Routes>
            <Route path="/">
              <Route
                key={'grid'}
                path={'grid'}
                element={lr(lazy(() => import('@/pages/Grid')))}
              />
              ;
            </Route>
          </Routes>
        )
          : (
            <ScreenAdaptor uiConfig={uiConfig}>
              <Routes>
                <Route
                  path="/"
                  element={
                    isLogin
                      ? lr(lazy(() => import('./MainLayout')))
                      : navigateTo('/access_denied')
                  }>
                  {routeList.map((el, index) => {
                    // @ts-ignore
                    return <Route key={index} {...el} />;
                  })}
                </Route>
              </Routes>
            </ScreenAdaptor>
          )}
    </>
  );
}
