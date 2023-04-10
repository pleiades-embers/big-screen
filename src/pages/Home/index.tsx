import { useRequest } from 'ahooks';
import { useMemo } from 'react';

import HeaderBG from '@/assets/page/header.png';
import { CanvasBg } from '@/components/CanvasBg';
import { postDetailRank } from '@/services/page';

import Center from './center';
import Left from './left';
import Right from './right';
import styles from './style.module.less';

export default function HomePage() {
  const { data } = useRequest(() => postDetailRank());

  const { health, nature, psychology, society, total } = useMemo(() => {
    if (!data) {
      return { health: [], nature: [], psychology: [], society: [], total: [] };
    } else {
      return {
        health: data.health,
        nature: data.nature,
        psychology: data.psychology,
        society: data.society,
        total: data.total,
      };
    }
  }, [data]);

  return (
    <div className={styles.Page}  >
      <CanvasBg type="universe" />
      <div className={styles.header}>
        <img src={HeaderBG} />
      </div>
      <Left health={health} nature={nature}></Left>
      <Center total={total}></Center>
      <Right psychology={psychology} society={society}></Right>
    </div>
  );
}
