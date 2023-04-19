import 'react-tooltip/dist/react-tooltip.css'

import { Tooltip } from 'react-tooltip';

import styles from "./style.module.less"

export default function CopyRight() {
    return (
        <div className={styles.copyRight}>
            <div>
                <div>上海中医药大学中医药国际化发展研究中心</div>
                <div>
                    Center for International Development of Traditional Chinese Medicine Shanghai University of Traditional Chinese Medicine
                </div>
            </div>
            <div>
                <div>外交学院俄罗斯研究中心</div>
                <div>Center for Russian Studies China Foreign Affairs University</div>
            </div>
            <div
                className={styles.tooltipContent}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="“生命安全指数”的数据通过大数据抓取从与生命安全相关信息，并归一化形成指数模型。通过语义分析，聚类分析等模型方法，评价不同国家和地区的生命安全状况，形成评价体系，如语义实体模型NER从传染病新闻中提取时间、地点、传染病等核心信息。根据经济总量、人口等，用k均值聚类分析等算法，对不同国家和地区进行聚类分析。“">
                <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="13" height="13"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#ffffff"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7c0-19.7 12.4-37.7 30.9-44.8 59-22.7 97.1-74.7 97.1-132.5 0.1-39.3-17.1-76-48.3-103.3z" fill="#ffffff"></path><path d="M512 732m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" fill="#ffffff"></path></svg>
                数据说明
                <Tooltip id="my-tooltip" style={{ backgroundColor: "#ffffff", color: "#000", width: 526, zIndex: 100 }} >
                </Tooltip>
            </div>

        </div>
    );
}
