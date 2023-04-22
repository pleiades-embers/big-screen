

import { useRequest } from 'ahooks';
import { useMemo } from 'react';

import DetailPng from '@/assets/disease/detail.png';
import TrendPng from '@/assets/disease/trend.png';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';
import { getRiseRank } from '@/services/disease';
import { toAdaptedPx } from '@/utils';

import styles from './style.module.less';
export default function Right() {

    const { data } = useRequest(() => getRiseRank({
        wordName: "influenza",
        timeType: 1
    }))
    const { trend, cityRank } = useMemo(() => {

        if (!data) {
            return {
                trend: [],
                cityRank: []
            }
        }
        return { trend: data.trend, cityRank: data.cityRank }

    }, [data])

    console.log(trend, cityRank)

    return (
        <div className={styles.right}>
            <div>
                <img src={TrendPng} alt="" />
                <SuperEChart options={getChart(trend)} mergeOptions={false} />
            </div>
            <div>
                <img src={DetailPng} alt="" />
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
        xAxis: {
            type: 'category',
            data: (data ?? []).map(item => item.dateTime)
        },
        legend: {
            data: ['传染病A'],
            right: "3%",
            top: "2%",
            textStyle: {
                color: '#E6F7FF', // 改为红色
                fontSize: toAdaptedPx(12), // 修改字号
                fontFamily: 'AlibabaPuHuiTi-2-45-Light'
            }
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
            type: 'value'
        },
        series: [
            {
                name: "传染病A",
                data: (data ?? [])?.map(item => item.value),
                type: 'line',
            }
        ]
    };
}
