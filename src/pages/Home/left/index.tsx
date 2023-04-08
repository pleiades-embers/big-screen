import { ScrollBoard } from '@jiaminghi/data-view-react';
import { useEffect, useMemo, useState } from 'react';

import BoardHeader from '@/components/BoardHeader';
import { toAdaptedPx } from '@/utils';
import { useWindowSize } from '@/utils/useWindowSize';

import styles from './style.module.less';

export default function Left(props) {
    const { health, nature } = props;

    const windowSize = useWindowSize();
    // const update = useUpdate();

    const [healthConfig, setHealthConfig] = useState({});
    useEffect(() => {
        setHealthConfig(
            structuredClone({
                data:
                    health?.map((item) => {
                        return [
                            `<span style="height:10px;">${item.sortNum}</span>`,
                            `<span style="height:10px;">${item.countryName}(${item.countryNameEn})</span>`,
                            `<span style="height:10px;">${item.score?.toFixed(2)}</span>`,
                        ];
                    }) ?? [],
                oddRowBGC: 'rgba(255, 255, 255, 0.17)',
                evenRowBGC: 'transparent',
                columnWidth: [100, 240, 100],
                rowNum: 8
            }),
        );
    }, [health, windowSize]);

    return (
        <div className={styles.Left}>
            <div>
                <BoardHeader></BoardHeader>
                <ScrollBoard config={healthConfig} />
            </div>
            <div></div>
        </div>
    );
}
