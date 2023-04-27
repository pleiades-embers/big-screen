
import "@arco-design/web-react/dist/css/arco.css";

import { useRequest } from 'ahooks';
import { useState } from 'react';

import HeaderBG from '@/assets/disease/headerBG.png';
import { CanvasBg } from '@/components/CanvasBg';
import { getCityRankByWord } from '@/services/disease';

import Center from './center';
import Left from './left';
import Right from './right';
import styles from './style.module.less';
export default function Disease() {
    const [activeWorld, setActiveWorld] = useState<any>()
    const { data, loading } = useRequest(() => getCityRankByWord(activeWorld?.nameEn ?? 'influenza'), {
        refreshDeps: [activeWorld],
        debounceInterval: 1000
    });


    return (
        <div className={styles.Disease}>
            <CanvasBg type="universe" />
            <div className={styles.header}>
                <img src={HeaderBG} />
            </div>
            <Left dataRank={data} onChange={setActiveWorld} loading={loading}></Left>
            <Center data={data} loading={loading}></Center>
            <Right activeWorld={activeWorld}></Right>
        </div>
    );
}
