// import { useAtom } from 'jotai';
// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// import { requestUserInfo } from '@/services/user';
// import { atomUserInfo } from '@/store/app';

export default function MainLayout() {
  // const [userInfo, setUserInfo] = useAtom(atomUserInfo);


  // useEffect(() => {
  //   requestUserInfo().then((data) => {
  //     setUserInfo(data);
  //   });
  // }, [setUserInfo]);

  return <Outlet />;
}
