import { ScrollBoard } from '@jiaminghi/data-view-react';

import BoardHeader from '@/components/BoardHeader';

import { getBoardConfig } from '../boardCell';
import styles from './style.module.less';

export default function Right(props) {
    const { psychology, society } = props;

    const psychologyConfig = {
        data:
            psychology?.map(getBoardConfig) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [100, 240, 100],
        rowNum: 8,
    };

    const societyConfig = {
        data:
            society?.map(getBoardConfig) ?? [],
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
