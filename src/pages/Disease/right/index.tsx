

import { useRequest } from 'ahooks';
import { useMemo, useState } from 'react';

import DetailPng from '@/assets/disease/detail.png';
import TrendPng from '@/assets/disease/trend.png';
import { ScrollTable } from '@/components/ScrollTable';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';
import { getRiseRank } from '@/services/disease';
import { toAdaptedPx } from '@/utils';

import styles from './style.module.less';
export default function Right() {
    const [activeTab, setActiveTab] = useState(1)
    const { data } = useRequest(() => getRiseRank({
        wordName: "influenza",
        timeType: activeTab
    }), {
        refreshDeps: [activeTab]
    })
    const { trend, cityRank } = useMemo(() => {

        if (!data) {
            return {
                trend: [],
                cityRank: []
            }
        }
        return { trend: data.trend, cityRank: data.cityRank }

    }, [data])

    console.log(cityRank)
    const tableConfig = {
        waitTime: 3000,
        hoverPause: true,
        headerHeight: toAdaptedPx(50),
        headerBGC: 'linear-gradient(0deg, #1C3B68 -24.83%, rgba(47, 61, 82, 0.0884779) 140%)',
        oddRowBGC: 'transparent',
        evenRowBGC: 'rgba(255, 255, 255, 0.17)',
        header: ['国家(Country)', '新增', '累计', "治愈"],
        columnWidth: [toAdaptedPx(180), toAdaptedPx(140)],
        data: new Array(90).fill(0).map(() => {
            return [
                `杭州${~~(Math.random() * 80000)}有限公司公司有限公司公司`,
                `地址${~~(Math.random() * 80000)}`,
                `${~~(Math.random() * 80000)}万元`,
            ];
        }),
        rowNum: 12
    };

    return (
        <div className={styles.right}>
            <div>
                <img src={TrendPng} alt="" />
                <SuperEChart options={getChart(trend)} mergeOptions={false} />
                <div className={styles.tabs}>
                    {
                        ["周", "月", "年"].map((item, index) => {
                            return <div key={item} className={activeTab === index + 1 && styles.tabActive} onClick={() => setActiveTab(index + 1)}>{item}</div>
                        })
                    }

                </div>
            </div>
            <div>
                <img src={DetailPng} alt="" />
                <div className={styles.diseaseDetail}>
                    <ScrollTable config={tableConfig} />;
                </div>
            </div>
        </div>
    );
}


function getChart(data): ECOption {
    return {
        title: {
            text: '单位：例',
            textStyle: {
                color: '#E6F7FF', // 改为红色
                fontSize: toAdaptedPx(12), // 修改字号
                fontFamily: 'AlibabaPuHuiTi-2-45-Light',
                fontWeight: "lighter",
            }
        },
        tooltip: {
            trigger: "axis",
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: (data ?? []).map(item => item.dateTime),
            axisLine: {
                lineStyle: {
                    color: "#bae7ff",
                    width: toAdaptedPx(1)
                }
            },

        },
        legend: {
            data: ['传染病A'],
            right: "3%",
            top: "2%",
            textStyle: {
                color: '#E6F7FF', // 改为红色
                fontSize: toAdaptedPx(12), // 修改字号
                fontFamily: 'AlibabaPuHuiTi-2-45-Light'
            },
        },
        grid: [
            {
                top: "17%",
                left: "8%",
                right: "4%",
                bottom: '16%'
            },
        ],
        yAxis: {
            type: 'value',
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#E6F7FF',
                    width: toAdaptedPx(1)
                },
            },
            axisLabel: {
                // @ts-ignore
                textStyle: {
                    fontSize: toAdaptedPx(12),
                    color: "#fff",
                    fontFamily: 'AlibabaPuHuiTi-2-45-Light'
                }
            },

        },
        series: [
            {
                name: "传染病A",
                data: (data ?? [])?.map(item => item.value),
                type: 'line',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: "#4E8BFF", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(0, 0, 0, 0)', // 0% 处的颜色
                            },
                        ],
                        global: false,
                    },
                }
            }
        ]
    };
}
