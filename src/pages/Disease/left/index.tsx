import { useRequest } from 'ahooks';

import RankPng from '@/assets/disease/rank.png';
import WorldCloudTitlePng from '@/assets/disease/world-cloud-title.png';
import { AutoScrollView } from '@/components/AutoScrollView';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';
import { getWordsCloud } from '@/services/disease';

import styles from './style.module.less';

export default function Left(props) {
    /**
     * 词云
     */
    const { data } = useRequest(getWordsCloud);
    const { dataRank } = props

    return (
        <div className={styles.left}>
            <div>
                <img src={WorldCloudTitlePng} alt="" />
                <SuperEChart options={getChart(data)} mergeOptions={false} />
            </div>
            <div>
                <img src={RankPng} alt="" />
                <div className={styles.list} >
                    <AutoScrollView height={52 * 10} mode="step" stepHeight={52}>
                        {(dataRank ?? []).map((el) => {
                            return (
                                <div className={styles.listItem} key={el.countryName}>
                                    <div>
                                        <div className={styles.title}>{el.sortNum}.</div>
                                        <div className={styles.title}>{el.countryName}</div>
                                        <div className={styles.value}>{el.value ?? 0}</div>
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div style={{ width: `${el.value}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </AutoScrollView>
                </div>
            </div>
        </div>
    );
}

function getChart(data): ECOption {
    return {
        series: [
            {
                //@ts-ignore
                type: 'wordCloud',
                shape: 'circle',
                keepAspect: false,
                width: '90%',
                height: '90%',
                right: '6%',
                left: '3%',
                top: '0%',
                bottom: '10%',
                sizeRange: [12, 28],
                rotationRange: [0, 0],
                gridSize: 10,
                textStyle: {
                    // fontFamily: 'PingFangSC',
                    fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
                    color: function () {
                        let colors = ['#46DADB', '#3254DD', '#BEE5FB', '#C6FFAA'];
                        //@ts-ignore
                        return colors[parseInt(Math.random() * 4)];
                    },
                },
                data: data ?? [],
            },
        ],
    };
}
