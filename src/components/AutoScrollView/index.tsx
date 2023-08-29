import anime from 'animejs';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

import { toAdaptedPx } from '@/utils';

import styles from './style.module.less';

interface AutoScrollViewProps extends React.ComponentPropsWithRef<'div'> {
  /** 滚动模式 */
  mode?: 'full' | 'step';
  /** 滚动容器的高度 */
  height: number;
  /** mode 为 step 时，stepHeight为每次滚动的高度 */
  stepHeight?: number;
  children: React.ReactNode;
  resetting?: boolean;
  isTimerEnabled?: boolean;
}

export function AutoScrollView(props: AutoScrollViewProps) {
  const {
    mode = 'full',
    height,
    stepHeight = 40,
    children,
    className,
    style,
    resetting,
    isTimerEnabled,
    ...restProps
  } = props;

  const viewHeight = toAdaptedPx(height);
  const _stepHeight = toAdaptedPx(stepHeight);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxTranslateY, setMaxTranslateY] = useState(0);

  useEffect(() => {
    if (!resetting && containerRef.current) {
      containerRef.current.style.transform = 'translateY(0)';
      return () => {
        // 执行清理处理，例如移除transforms
      };
    }
  }, [resetting, containerRef]);
  useEffect(() => {
    let intervalId;
    if (isTimerEnabled) {
      intervalId = setInterval(() => {
        const element = containerRef.current;
        if (element) {
          const computedStyle = getComputedStyle(element);
          const transform = computedStyle.transform || computedStyle.webkitTransform;
          if (transform && transform !== 'none') {
            const matrix = transform.match(/matrix.*\((.+)\)/);
            if (matrix && matrix[1]) {
              const matrixValues = matrix[1].split(', ');
              const translateYValue = parseFloat(matrixValues[5]);
              if (translateYValue >= maxTranslateY) {
                containerRef.current.style.transform = 'translateY(0)';
              }
            }
          }
        }
      }, 1000); // 每秒钟执行一次
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [containerRef, isTimerEnabled, maxTranslateY]);

  console.log(maxTranslateY, '111');
  useEffect(() => {
    if (containerRef.current !== null) {
      const { height: containerHeight } = containerRef.current.getBoundingClientRect();
      if (containerHeight <= viewHeight) return;

      const baseOptions = {
        targets: containerRef.current,
        loop: true,
        duration: Math.round(60 * (containerHeight - viewHeight)),
        delay: 1000,
        endDelay: 1200,
      };

      if (mode === 'full') {
        anime({
          ...baseOptions,
          translateY: viewHeight - containerHeight,
          easing: 'linear',
        });
      } else if (mode === 'step') {
        const steps = Math.floor((containerHeight - viewHeight) / _stepHeight) + 1;
        const keyframes = new Array(steps).fill(0).map((_, index) => {
          return { translateY: -_stepHeight * (index + 1), delay: 1000 };
        });
        setMaxTranslateY(keyframes[keyframes.length - 1]?.translateY);
        anime({
          ...baseOptions,
          easing: 'easeOutCirc',
          keyframes,
        });
      }
    }
  }, [_stepHeight, viewHeight, mode, children]);

  return (
    <div
      className={clsx(styles.AutoScrollView, className)}
      style={{ ...style, height: viewHeight }}
      {...restProps}>
      <div className={styles.asv__container} ref={containerRef}>
        {children}
      </div>
    </div>
  );
}
