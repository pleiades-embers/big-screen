
import HeaderBG from '@/assets/disease/headerBG.png';
import { CanvasBg } from '@/components/CanvasBg';

import Left from './left';
import styles from './style.module.less';
export default function Disease() {
    return (
        <div className={styles.Disease}>
            <CanvasBg type="universe" />
            <div className={styles.header}>
                <img src={HeaderBG} />
            </div>
            <Left></Left>
        </div>
    );
}
