import { Spin } from "@arco-design/web-react"
import { useMemo } from 'react';

import RankPng from '@/assets/disease/rank.png';
import WorldCloudTitlePng from '@/assets/disease/world-cloud-title.png';
import { AutoScrollView } from '@/components/AutoScrollView';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';

import styles from './style.module.less';

export default function Left(props) {
    /**
     * 词云
     */

    const { dataRank, loading, data, worldLoading } = props
    const chartOptions = useMemo(() => {
        return getChart(data)
    }, [data])

    return (
        <div className={styles.left}>
            <div>
                <img src={WorldCloudTitlePng} alt="" />
                <Spin loading={worldLoading} block>
                    <SuperEChart options={chartOptions} mergeOptions={false}
                        onChartClick={(params) => {
                            props?.onChange?.(params.data)
                        }}
                    />
                </Spin>

            </div>
            <div>
                <img src={RankPng} alt="" />
                <Spin block loading={loading}>
                    <div className={styles.list} >

                        <AutoScrollView resetting={loading} height={52 * 10} mode="step" stepHeight={52}   >
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
                </Spin>
            </div>
        </div>
    );
}
const colors = ["#46DADB", "#3254DD", "#BEE5FB", "#C6FFAA"];
function getChart(data): ECOption {
    return {
        series: [
            {
                //@ts-ignore
                type: 'wordCloud',
                shape: 'circle',
                keepAspect: false,
                width: '90%',
                height: '94%',
                right: '6%',
                left: '3%',
                top: '0%',
                bottom: '6%',
                sizeRange: [12, 28],
                rotationRange: [0, 0],
                gridSize: 20,
                textStyle: {
                    // fontFamily: 'PingFangSC',
                    fontFamily: 'AlibabaPuHuiTi-2-85-Bold',
                    color: function (v) {
                        return v.data.color; // 返回与数据项关联的颜色
                    },
                },
                data: (data ?? []).map((item) => {
                    //@ts-ignore
                    return { ...item, color: colors[parseInt(Math.random() * 4)] };
                }) ?? [],
            },
        ],
    };
}
