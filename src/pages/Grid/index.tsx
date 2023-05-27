
export default function GridPage() {


    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gridTemplateRows: "repeat(2,1fr)",
            gap: 0,
            backgroundColor: '#fff',
            width: "100%",
            height: "100%",
        }}>
            <div>
                <iframe style={{ width: "100%", height: "100%" }} src="http://47.100.208.92/"></iframe>
            </div>
            <div>
                <iframe style={{ width: "100%", height: "100%" }} src="http://47.100.208.92/d1"></iframe>
            </div>

            <div>
                <iframe style={{ width: "100%", height: "100%" }} src="http://47.100.208.92:8000"></iframe>
            </div>
            <div>
                <iframe style={{ width: "100%", height: "100%" }} src="http://47.100.208.92"></iframe>
            </div>
        </div >
    )

}