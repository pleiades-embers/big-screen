
import "@arco-design/web-react/dist/css/arco.css";

import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';

import HeaderBG from '@/assets/disease/headerBG.png';
import { CanvasBg } from '@/components/CanvasBg';
import { getCityRankByWord, getWordsCloud } from '@/services/disease';

import Center from './center';
import Left from './left';
import Right from './right';
import styles from './style.module.less';
export default function Disease() {
    const [activeWorld, setActiveWorld] = useState<any>()
    const { data: worldData, loading: worldLoading } = useRequest(getWordsCloud);
    const { data, loading } = useRequest(() => getCityRankByWord(activeWorld?.nameEn ?? 'influenza'), {
        refreshDeps: [activeWorld],
        debounceInterval: 1000
    });
    // 当你需要改变页面标题的动态值
    const dynamicTitle = "传染病监测系统";

    useEffect(() => {
        // 将原始标题存储在一个变量中
        const originalTitle = document.title;

        // 设置新的标题
        document.title = dynamicTitle;

        //在组件卸载时将标题重置为原始标题
        return () => {
            document.title = originalTitle;
        };
    }, [dynamicTitle]);


    return (
        <div className={styles.Disease}>
            <CanvasBg type="universe" />
            <div className={styles.header}>
                <img src={HeaderBG} />
            </div>
            <Left dataRank={data} data={worldData} worldLoading={worldLoading} onChange={setActiveWorld} loading={loading}></Left>
            <Center data={data} loading={loading}></Center>
            <Right activeWorld={activeWorld} worldData={worldData}></Right>
        </div>
    );
}
