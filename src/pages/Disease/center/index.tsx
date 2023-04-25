import { useRequest } from 'ahooks';
import dayjs from "dayjs"
import { registerMap } from 'echarts/core';
import { useMemo } from 'react';

import CenterPng from "@/assets/disease/center.png"
import { AutoScrollView } from '@/components/AutoScrollView';
import type { ECOption } from '@/components/SuperEChart';
import { SuperEChart } from '@/components/SuperEChart';
import WorldPalestine from '@/pages/Home/center/world.json';
import { getVitalScreenInfectious } from '@/services/disease';
import { toAdaptedPx } from '@/utils';

import RichTooltipPng from './richTooltip.png'
import styles from './style.module.less';
// @ts-ignore
registerMap('Asia', WorldPalestine);
export default function Center(props) {
    const { data = [] } = props;


    const { data: infectious } = useRequest(getVitalScreenInfectious);


    //地图数据处理
    const { mapData } = useMemo(() => {
        if (!data) {
            return {
                mapData: [],
            };
        }
        return {
            mapData: (data ?? []).map((item) => {
                return {
                    ...item,
                    name: item.countryNameEn,
                    value: item.value,
                };
            }),
        };
    }, [data]);


    return (
        <div className={styles.center}>
            <SuperEChart options={getChart(mapData)} mergeOptions={false} />
            <div className={styles.infectious}>
                <img src={CenterPng} alt="" />
                <div className={styles.content}>
                    <AutoScrollView height={50 * 5} >
                        <div className={styles.contentScrollBox}>
                            {(infectious ?? []).map((el) => {
                                return (
                                    <div key={el?.sortNum}>
                                        {dayjs(el?.publishTime).format("YYYY.MM")} <a href={el?.url} target="_blank" rel="noreferrer">{el?.titleCn}</a>
                                    </div>
                                );
                            })}
                        </div>
                    </AutoScrollView>
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
function getChart(data): ECOption {
    return {
        tooltip: {
            show: true,
            formatter: function (params) {
                const tooltipData = params?.data;
                const countryStr =
                    params?.name !== 'Taiwan(中国省)'
                        ? `<div>
                <span>国家:</span>
                <span>${tooltipData?.countryName ?? '-'}</span>
                <div>${tooltipData?.countryNameEn ?? ''}</div>`
                        : `<div>
                <span>${params?.name ?? '-'}</span>`;

                let res = `<div  id="map-tooltip">
            ${countryStr}
              </div>
              <div  >
              <span >总排名</span>
              <span class="num">${tooltipData?.sortNum ?? "-"}</span>
            </div>
                <div  >
                  <span >总分</span>
                  <span class="num">${tooltipData?.value?.toFixed(2) ?? '-'}</span>
                </div>
                <div >
                <span >健康维度</span>
                <span class="num">${tooltipData?.health?.score?.toFixed(2) ?? '-'}</span>
                </div>
                <div >
                <span >自然维度</span>
                <span class="num">${tooltipData?.nature?.score?.toFixed(2) ?? '-'}</span>
                </div>
                <div >
                <span >社会维度</span>
                <span class="num">${tooltipData?.society?.score?.toFixed(2) ?? '-'}</span>
                </div>
                <div >
                <span >心理维度</span>
                <span class="num">${tooltipData?.psychology?.score?.toFixed(2) ?? '-'
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
                    project: (point) => [
                        (point[0] / 180) * Math.PI,
                        -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2)),
                    ],
                    unproject: (point) => [
                        (point[0] * 180) / Math.PI,
                        ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90,
                    ],
                },
                top: toAdaptedPx(175),
                height: toAdaptedPx(520),
                width: toAdaptedPx(880),
                left: toAdaptedPx(0),
                right: toAdaptedPx(30),
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
                    // @ts-ignore
                    formatter: function (params: any) {
                        // 设置文字标签的显示内容
                        if (params?.value || params?.value === 0) {
                            return `{tooltip|${params.value}}`;


                        } else {
                            return '';
                        }
                    },
                    rich: {
                        tooltip: {
                            width: 40,
                            height: 29,
                            fontFamily: 'PingFang SC',
                            padding: [-6, -4, -0, -4],
                            fontSize: toAdaptedPx(16),
                            backgroundColor: {
                                image: RichTooltipPng,
                            },
                        },
                    },
                },
                itemStyle: {
                    opacity: 1, // 透明度
                    borderWidth: 1, //分界线宽度
                    //@ts-ignore
                    normal: {
                        borderColor: '#39c4ff', //分界线颜色
                        areaColor: '#12275d' // 改为白色
                    }
                },
                // ...mapOption.series,
            },
        ],
    };
}
