import { CanvasBg } from '@/components/CanvasBg';

import styles from './style.module.less';

export default function HomePage() {
  return (
    <div className={styles.Page}>
      <CanvasBg type="universe" />
      <div className={styles.header}>
        <div className={styles.headerTitle}>宇宙大屏</div>
      </div>
    </div>
  );
}
