import { useRequest } from 'ahooks';
import { useEffect, useMemo, useRef } from 'react';

import HeaderBG from '@/assets/page/header.png';
import { CanvasBg } from '@/components/CanvasBg';
import { postDetailRank } from '@/services/page';

import Left from './left';
import styles from './style.module.less';

export default function HomePage() {
  const { data, loading } = useRequest(() => postDetailRank());

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
    </div>
  );
}
