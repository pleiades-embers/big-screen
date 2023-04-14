export function getBoardConfig(item) {
  return [
    `<span style="height:10px;">${item.sortNum}</span>`,
    `<span style="height:10px;">${item.countryName}(${item.countryNameEn})</span>`,
    item?.isGrowth === 'rise'
      ? `<span style="height:10px;">${item.score?.toFixed(
          2,
        )}<svg  width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">

      <path d="M0 4L4 0L8 4H0Z" fill="#C6FFAA"  class="board-svg"   />
      </svg>
      </span>`
      : item?.isGrowth === 'fall'
      ? `<span style="height:10px;">${item.score?.toFixed(
          2,
        )}<svg style="vertical-align:middle;" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      

        <path d="M0 0L4 4L8 0H0Z" fill="#FF9B68"   class="board-svg"   />
      </svg>
      </span>`
      : `<span style="height:10px;">${item.score?.toFixed(2)} -</span>`,
  ];
}
