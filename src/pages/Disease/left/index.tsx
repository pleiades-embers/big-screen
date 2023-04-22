import { useRequest } from "ahooks";

import RankPng from "@/assets/disease/rank.png"
import WorldCloudTitlePng from "@/assets/disease/world-cloud-title.png"
import type { ECOption } from "@/components/SuperEChart";
import { SuperEChart } from "@/components/SuperEChart";
import { getCityRankByWord, getWordsCloud } from "@/services/disease";

import styles from "./style.module.less"


export default function Left() {

    /**
     * 词云
     */
    const { data } = useRequest(getWordsCloud);
    const { data: dataRank } = useRequest(() => getCityRankByWord("influenza"));
    console.log(dataRank, "dataRank")
    return (
        <div className={styles.left}>
            <div>
                <img src={WorldCloudTitlePng} alt="" />
                <SuperEChart options={getChart(data)} mergeOptions={false} />
            </div>
            <div>
                <img src={RankPng} alt="" />

            </div>
        </div>
    )
}

function getChart(data): ECOption {
    return {

        series: [{
            //@ts-ignore
            type: 'wordCloud',
            shape: 'circle',
            keepAspect: false,
            width: '94%',
            height: '90%',
            right: "3%",
            left: "3%",
            top: "0%",
            bottom: "10%",
            sizeRange: [18, 36],
            rotationRange: [0, 0],
            gridSize: 16,
            textStyle: {
                // fontFamily: 'PingFangSC',
                fontFamily: 'AlibabaPuHuiTi-2',
                fontWeight: 'bold',
                color: function () {
                    let colors = ['#46DADB', "#3254DD", "#BEE5FB", "#C6FFAA"]
                    //@ts-ignore
                    return colors[parseInt(Math.random() * 4)];
                },
            },
            data: data ?? []
        }],

    }
}
