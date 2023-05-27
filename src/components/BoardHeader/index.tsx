
import styles from "./style.module.less"

export default function BoardHeader(props) {


    return (
        <div className={styles.board}>
            <div style={{
                borderBottom: `2px solid ${props?.borderColor ?? "#9dc761"}`,
                color: `${props?.borderColor ?? "#9dc761"}`
            }}>
                <div>排名(Rank)</div>
                <div>国家(Country)</div>
                <div>得分(Score)</div>
            </div>
        </div>
    )
}