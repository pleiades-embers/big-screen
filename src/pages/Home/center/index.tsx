import { ScrollBoard } from '@jiaminghi/data-view-react';
import { registerMap } from 'echarts/core';

import BoardHeader from '@/components/BoardHeader';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';

import styles from './style.module.less';
import WorldPalestine from "./world.json"
// @ts-ignore
registerMap("Asia", WorldPalestine)
export default function Center(props) {
    const { total } = props;
    const totalConfig = {
        data:
            total?.map((item) => {
                return [
                    `<span style="height:10px;">${item.sortNum}</span>`,
                    `<span style="height:10px;">${item.countryName}(${item.countryNameEn})</span>`,
                    `<span style="height:10px;">${item.score?.toFixed(2)}</span>`,
                ];
            }) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [100, 240, 100],
        rowNum: 5,
    };

    return (
        <div className={styles.center}>
            <SuperEChart
                options={getChart()}
                mergeOptions={false}
            />
            <div>
                <BoardHeader borderColor="#1B7AE4"></BoardHeader>
                <ScrollBoard config={totalConfig} />
            </div>

        </div>
    );
}


const mapOption = {
    series: {
        boxWidth: 110, //三维地图的宽度
        boxDepth: 80, //地图倾斜度  正交投影失效
        regionHeight: 0.1, //地图厚度
        itemStyle: {
            opacity: 1, // 透明度
            borderWidth: 0.6, //分界线宽度
            borderColor: "#207fce", //分界线颜色
        },
        groundplane: {
            show: false,
        },
        light: {
            main: {
                intensity: 3, //光照强度
                alpha: 24,
                shadow: true,
                shadowQuality: "high",
            },
            ambient: {
                intensity: 0,
            },
        },
        shading: "realistic",
        // 真实感材质相关配置 shading: 'realistic'时有效
        realisticMaterial: {
            detailTexture: "#fff", // 纹理贴图
            textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
            roughness: 0.5, // 材质粗糙度，0完全光滑，1完全粗糙
            metalness: 0, // 0材质是非金属 ，1金属
            roughnessAdjust: 0,
        },
        viewControl: {
            //投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
            projection: "orthographic",
            //正交投影此配置失效
            distance: 85,
            orthographicSize: 90,
            animation: false,
            panMouseButton: 'left',
            rotateMouseButton: 'middle',
            center: [0, 5, 0],
        },
    },
    //处理特效
    postEffect: {
        enable: true,
        //环境光遮蔽
        screenSpaceAmbientOcclusion: {
            enable: true,
            quality: "high",
        },
        bloomObject: {
            enable: true,
        },
        //分帧超采样
        temporalSuperSampling: {
            enable: true,
        },
    },
    //地图数值颜色
    visualMap: {
        pieces: [
            {
                min: 100001,
                color: '#BB0000',
            },
            {
                min: 50001,
                max: 100000,
                color: '#a2242c' // #73240D
            },
            {
                min: 25001,
                max: 50000,
                color: '#C62B2B',
            },
            {
                min: 1001,
                max: 25000,
                color: '#D25555',
            },
            {
                min: 3001,
                max: 10000,
                color: '#d0513c',
            },
            {
                min: 501,
                max: 3000,
                color: '#ed9f65'
            },

            {
                min: 1,
                max: 500,
                color: '#ed9a62'
            },
            {
                value: 0,
                color: 'white'
            }
        ]
    }

};

function getChart(): ECOption {


    return {
        // visualMap: {
        //     show: false,
        //     type: "piecewise",
        //     pieces: mapOption.visualMap.pieces,
        //     orient: "vertical",
        //     itemWidth: 25,
        //     itemHeight: 15,
        //     showLabel: true,
        //     seriesIndex: [0],
        //     textStyle: {
        //         color: "#7B93A7",
        //     },

        // },
        tooltip: {
            show: true,
        },
        series: [
            {
                name: "确诊人数",
                // @ts-ignore
                //数据源
                type: 'map3D',
                map: "Asia",
                data: [],
                // label: {
                //     show: true, //是否显示市
                //     textStyle: {
                //         color: "#fff", //文字颜色
                //         fontSize: 12, //文字大小
                //         fontFamily: "微软雅黑",
                //         backgroundColor: "rgba(0,0,0,0)", //透明度0清空文字背景
                //     },
                // },
                ...mapOption.series,

            },
        ],
    };
}
