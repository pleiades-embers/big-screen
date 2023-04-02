import HeaderBG from '@/assets/page/header.png'
import { CanvasBg } from '@/components/CanvasBg';

import styles from './style.module.less';

export default function HomePage() {
  return (
    <div className={styles.Page}>
      <CanvasBg type="universe" />
      <div className={styles.header}>
        <img src={HeaderBG} />
      </div>
    </div>
  );
}
