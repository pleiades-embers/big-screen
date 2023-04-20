import 'react-tooltip/dist/react-tooltip.css'

import { Tooltip } from 'react-tooltip';

import styles from "./style.module.less"

export default function CopyRight() {
    return (
        <div className={styles.copyRight}>
            <div
                className={styles.tooltipContent}>
                <div data-tooltip-id="my-tooltip"
                    data-tooltip-html={`<div>版权归属：
                        <div> 上海中医药大学中医药国际化发展研究中心 <br/>
                        Center for International Development of Traditional ChineseMedicine Shanghai University of Traditional Chinese Medicinc
                        </div>
                        <div>
                        外交学院俄罗斯研究中心
                        <br/>
                        Center for Russian Studies China Foreign Affairs University
                        </div>
                        <div>
                        说明：
                        <br/>
                        “生命安全指数”的数据从WHO，世界银行，联合国等权威国际组织，筛选与人类生命安全相关的基础数据入手，以确保数据的权威性及全面性。同时，该指数密切跟踪社会环境风险及自然环境风险相关的权威数据库，并且从新闻媒体、社交网络等分析与生命安全相关的报道，分析与国别相关的生命安全相关情况，并归一化形成指数模型。 <br/>
                        通过语义分析，聚类分析等模型方法，分成公共卫生、自然风险、社会风险、心理健康等四个维度，同时考虑到不同国家经济、人口等情况，评价不同国家和地区的生命安全状况，形成评价体系。其中语义实体模型NER从传染病新闻中提取时间、地点、传染病等核心信息。根据经济总量、人口等，用k均值聚类分析等算法，对不同国家和地区进行聚类分析，对不同类型的数据做归一化分析，避免长尾效应对归一化分析的影响。 <br/>
                        The "Life Safety Index" selects basic data related to human life safety from authoritative international organizations such as WHO, World Bank, and the United Nations to ensure the authority and comprehensiveness of the data. At the same time, the index closely tracks authoritative databases related to social and natural environment risks, and analyzes life safety-related reports from news media, social networks, etc., to analyze life safety-related situations related to different countries and normalize them to form an index model. <br/>
                        Through semantic analysis, clustering analysis and other modeling methods, it is divided into four dimensions: public health, natural risks, social risks, and mental health. Considering the economic and population situations of different countries, an evaluation system is formed to evaluate the life safety conditions of different countries and regions. The semantic entity model NER extracts core information such as time, location, and infectious diseases from infectious disease news. Based on the total economy, population, etc., different countries and regions are clustered and analyzed using algorithms such as k-means clustering analysis, and different types of data are normalized to avoid the influence of the long-tail effect on the normalization analysis.  </div></div>`}>

                    <svg className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="13" height="13"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" fill="#ffffff"></path><path d="M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7c0-19.7 12.4-37.7 30.9-44.8 59-22.7 97.1-74.7 97.1-132.5 0.1-39.3-17.1-76-48.3-103.3z" fill="#ffffff"></path><path d="M512 732m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" fill="#ffffff"></path></svg>
                    版权及说明(Copyright & Disclaimer)
                    <Tooltip id="my-tooltip" data-tooltip-offset={0} style={{ backgroundColor: "#ffffff", color: "#000", width: 800, zIndex: 100 }} >
                    </Tooltip>
                </div>
            </div>

        </div >
    );
}
