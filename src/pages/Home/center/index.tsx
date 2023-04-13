import { ScrollBoard } from '@jiaminghi/data-view-react';
import { registerMap } from 'echarts/core';
import { useMemo } from 'react';

import BoardHeader from '@/components/BoardHeader';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';
import { toAdaptedPx } from '@/utils';

import { getBoardConfig } from '../boardCell';
import downPng from "./down.png"
import richPng from "./rich.png"
import richArrow from "./richArrow.png"
import styles from './style.module.less';
import upPng from "./up.png"
import WorldPalestine from './world.json';
// @ts-ignore
registerMap('Asia', WorldPalestine);
export default function Center(props) {
    const { data } = props;
    const totalConfig = {
        data: data?.total?.map(getBoardConfig) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [toAdaptedPx(120), toAdaptedPx(520), toAdaptedPx(100)],
        rowNum: 8,
    };

    //地图数据处理
    const { mapData, visualMap } = useMemo(() => {
        if (!data) {
            return {
                mapData: [],
                visualMap: {},
            };
        }
        let arr = structuredClone(data?.total);

        return {
            mapData: arr.map((item) => {
                return {
                    ...item,
                    name: item.countryNameEn,
                    value: item.score,
                    health: data.health.find((item2) => item.countryName === item2.countryName),
                    nature: data.nature.find((item2) => item.countryName === item2.countryName),
                    psychology: data.psychology.find(
                        (item2) => item.countryName === item2.countryName,
                    ),
                    society: data.society.find((item2) => item.countryName === item2.countryName),
                };
            }),
            visualMap: {
                min: 0,
                type: 'piecewise',
                splitNumber: 3,
                orient: 'horizontal',
                left: 'center',
                bottom: '3%',
                pieces: [
                    {
                        lte: data?.total[0]?.score,
                        gte: data?.total[9]?.score,
                        label: 'Top1-Top10',
                        color: '#ff7c72',
                    },
                    {
                        lte: data?.total[10]?.score,
                        gte: data?.total[19]?.score,
                        label: 'Top11-Top20',
                        color: '#f23829',
                    },
                    {
                        lte: data?.total[20]?.score,
                        label: 'Top20及以下',
                        color: '#a61f15',
                    },
                ],
                textStyle: {
                    color: 'white',
                },
            },
        };
    }, [data]);

    return (
        <div className={styles.center}>
            <SuperEChart options={getChart(mapData, visualMap)} mergeOptions={false} />
            <div>
                <BoardHeader borderColor="#1B7AE4"></BoardHeader>
                <div className={styles.boardBox}>
                    <ScrollBoard
                        style={{
                            width: '100%',
                        }}
                        config={totalConfig}
                    />
                </div>
            </div>
        </div>
    );
}

// const mapOption = {
//     series: {
//         boxWidth: 110, //三维地图的宽度
//         boxDepth: 80, //地图倾斜度  正交投影失效
//         regionHeight: 0.1, //地图厚度

//         groundplane: {
//             show: false,
//         },
//         light: {
//             main: {
//                 intensity: 3, //光照强度
//                 alpha: 24,
//                 shadow: true,
//                 shadowQuality: 'high',
//             },
//             ambient: {
//                 intensity: 0,
//             },
//         },
//         shading: 'realistic',
//         // 真实感材质相关配置 shading: 'realistic'时有效
//         realisticMaterial: {
//             detailTexture: '#fff', // 纹理贴图
//             textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
//             roughness: 0.5, // 材质粗糙度，0完全光滑，1完全粗糙
//             metalness: 0, // 0材质是非金属 ，1金属
//             roughnessAdjust: 0,
//         },
//         viewControl: {
//             // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
//             // projection: 'orthographic',
//             // 正交投影此配置失效
//             distance: 85,
//             orthographicSize: 90,
//             animation: false,
//             panMouseButton: 'left',
//             rotateMouseButton: 'middle',
//             center: [0, 5, 0],
//         },
//     },
//     //处理特效
//     postEffect: {
//         enable: true,
//         //环境光遮蔽
//         screenSpaceAmbientOcclusion: {
//             enable: true,
//             quality: 'high',
//         },
//         bloomObject: {
//             enable: true,
//         },
//         //分帧超采样
//         temporalSuperSampling: {
//             enable: true,
//         },
//     },
// };
function getChart(data, visualMap): ECOption {
    return {
        tooltip: {
            show: true,
            formatter: function (params) {
                const tooltipData = params?.data;

                const countryStr =
                    params?.name !== 'Taiwan(中国省)'
                        ? `<div>
                <span>国家:</span>
                <span>${tooltipData?.countryName ?? "-"}</span>
                <div>${tooltipData?.countryNameEn ?? ""}</div>`
                        : `<div>
                <span>${params?.name ?? "-"}</span>`;

                let res = `<div  id="map-tooltip">
            ${countryStr}
              </div>
                <div  >
                  <span >总分</span>
                  <span class="num">${tooltipData?.value?.toFixed(2) ?? '-'
                    }</span>
                </div>
                <div >
                <span >健康维度</span>
                <span class="num">${tooltipData?.health?.score?.toFixed(2) ?? '-'
                    }</span>
                </div>
                <div >
                <span >自然维度</span>
                <span class="num">${tooltipData?.nature?.score?.toFixed(2) ?? '-'
                    }</span>
                </div>
                <div >
                <span >社会维度</span>
                <span class="num">${tooltipData?.psychology?.score?.toFixed(2) ?? '-'
                    }</span>
                </div>
                <div >
                <span >心里维度</span>
                <span class="num">${tooltipData?.society?.score?.toFixed(2) ?? '-'
                    }</span>
                </div>
            </div>`;
                return res;
            },
        },
        series: [
            {
                name: '环太生命指数',
                // @ts-ignore
                //数据源
                type: 'map',
                map: 'Asia',
                data: data,
                roam: true,
                projection: {
                    project: (point) => [point[0] / 180 * Math.PI, -Math.log(Math.tan((Math.PI / 2 + point[1] / 180 * Math.PI) / 2))],
                    unproject: (point) => [point[0] * 180 / Math.PI, 2 * 180 / Math.PI * Math.atan(Math.exp(point[1])) - 90]
                },
                top: toAdaptedPx(180),
                height: toAdaptedPx(450),
                left: toAdaptedPx(20),
                right: toAdaptedPx(20),
                bottom: toAdaptedPx(0),
                label: {
                    show: true,
                    // @ts-ignore
                    textStyle: {
                        color: '#fff', //文字颜色
                        alignText: 'center',
                        // backgroundColor: '#1f64ca', //透明度0清空文字背景
                        // borderWidth: 1, //分界线宽度
                        // borderRadius: 3,
                        // borderColor: '#bfd8fe', //分界线颜色
                        zIndex: 10,
                    },
                    formatter: function (params) { // 设置文字标签的显示内容
                        if (params?.value) {
                            // @ts-ignore
                            return `{bg|${params?.value?.toFixed(2)}}\n{arrow|}`;
                        } else {
                            return "";
                        }
                    },
                    rich: {
                        bg: {
                            height: 20,
                            width: 64,
                            fontSize: 16,
                            padding: [2, 6, -2, -4],
                            backgroundColor: {
                                image: richPng
                            },
                        },
                        arrow: {
                            width: 9,
                            height: 10,
                            padding: [-2, 0, 0, 0],
                            backgroundColor: {
                                image: richArrow
                            },
                        },
                        up: {
                            width: 8,
                            height: 4,
                            backgroundColor: {
                                image: upPng
                            },
                        },
                        down: {
                            width: 8,
                            height: 4,
                            backgroundColor: {
                                image: downPng
                            },
                        }
                    }
                },
                itemStyle: {
                    opacity: 1, // 透明度
                    borderWidth: 0.6, //分界线宽度
                    borderColor: '#207fce', //分界线颜色
                },
                // ...mapOption.series,
            },

        ],
        visualMap
    };
}
