
import { useRequest } from 'ahooks';

import HeaderBG from '@/assets/disease/headerBG.png';
import { CanvasBg } from '@/components/CanvasBg';
import { getCityRankByWord } from '@/services/disease';

import Center from './center';
import Left from './left';
import styles from './style.module.less';
export default function Disease() {
    const { data } = useRequest(() => getCityRankByWord('influenza'));
    return (
        <div className={styles.Disease}>
            <CanvasBg type="universe" />
            <div className={styles.header}>
                <img src={HeaderBG} />
            </div>
            <Left dataRank={data}></Left>
            <Center data={data}></Center>
        </div>
    );
}
