import { ScrollBoard } from '@jiaminghi/data-view-react';

import BoardHeader from '@/components/BoardHeader';

import { getBoardConfig } from '../boardCell';
import styles from './style.module.less';
export default function Left(props) {
    const { health, nature } = props;

    const healthConfig = {
        data:
            health?.map(getBoardConfig) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [100, 240, 100],
        rowNum: 8,
    };

    const natureConfig = {
        data:
            nature?.map(getBoardConfig) ?? [],
        oddRowBGC: 'rgba(255, 255, 255, 0.17)',
        evenRowBGC: 'transparent',
        columnWidth: [100, 240, 100],
        rowNum: 8,
    };

    return (
        <div className={styles.Left}>
            <div>
                <BoardHeader></BoardHeader>
                <ScrollBoard config={healthConfig} />
            </div>
            <div>
                <BoardHeader borderColor="#E07B29"></BoardHeader>
                <ScrollBoard config={natureConfig} />
            </div>
        </div>
    );
}
