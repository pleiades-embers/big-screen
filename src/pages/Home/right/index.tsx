import { ScrollBoard } from '@jiaminghi/data-view-react';

import BoardHeader from '@/components/BoardHeader';

import styles from './style.module.less';

export default function Right(props) {
    const { psychology, society } = props;

    const psychologyConfig = {
        data:
            psychology?.map((item) => {
                return [
                    `<span style="height:10px;">${item.sortNum}</span>`,
                    `<span style="height:10px;">${item.countryName}(${item.countryNameEn})</span>`,
                    `<span style="height:10px;">${item.score?.toFixed(2)}</span>`,
                ];
            }) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [100, 240, 100],
        rowNum: 8,
    };

    const societyConfig = {
        data:
            society?.map((item) => {
                return [
                    `<span style="height:10px;">${item.sortNum}</span>`,
                    `<span style="height:10px;">${item.countryName}(${item.countryNameEn})</span>`,
                    `<span style="height:10px;">${item.score?.toFixed(2)}</span>`,
                ];
            }) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [100, 240, 100],
        rowNum: 8,
    };

    return (
        <div className={styles.Right}>
            <div>
                <BoardHeader borderColor="#FBC819"></BoardHeader>
                <ScrollBoard config={psychologyConfig} />
            </div>
            <div>
                <BoardHeader borderColor="#98CCE4"></BoardHeader>
                <ScrollBoard config={societyConfig} />
            </div>
        </div>
    );
}
