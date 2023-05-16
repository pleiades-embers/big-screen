import "@arco-design/web-react/dist/css/arco.css";

import type { TableColumnProps } from '@arco-design/web-react';
import { Table } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { Button } from "antd";
import html2canvas from 'html2canvas';
import { useEffect, useMemo, useRef } from 'react';

import { postDetailRank } from '@/services/page';

import styles from './style.module.less';

export default function HomePage() {
    const { data } = useRequest(() => postDetailRank());

    const { health, nature, psychology, society, total } = useMemo(() => {
        if (!data) {
            return { health: [], nature: [], psychology: [], society: [], total: [] };
        } else {
            return {
                health: data.health,
                nature: data.nature,
                psychology: data.psychology,
                society: data.society,
                total: data.total,
            };
        }
    }, [data]);
    const columns: TableColumnProps[] = [

        {
            title: '排名 Rank',
            dataIndex: 'sortNum',
            width: 100,
        },
        {
            title: '国家 Country',
            render: (text, record) => {

                return <div>
                    {record?.countryName} &nbsp;&nbsp;  {record?.countryNameEn}
                </div>
            }
        },
        {
            title: '得分',
            dataIndex: 'score',
        },
    ];


    const healthColumns: TableColumnProps[] = [
        {
            title: '健康维度排名',
            children: columns,
        },
    ]

    const natureColumns: TableColumnProps[] = [
        {
            title: '自然维度排名',
            children: columns,
        },
    ]

    const psychologyColumns: TableColumnProps[] = [
        {
            title: '社会维度排名',
            children: columns,
        },
    ]

    const societyColumns: TableColumnProps[] = [
        {
            title: '健康维度排名',
            children: columns,
        },
    ]
    const totalColumns: TableColumnProps[] = [
        {
            title: '总排名',
            children: columns,
        },
    ]
    const captureRef = useRef(null);

    const handleDownload = async () => {
        const element = captureRef.current as any;

        try {
            // 生成canvas
            const canvas = await html2canvas(element);

            // 将canvas转为blob
            const imgUrl = canvas.toDataURL("image/png");
            const blob = dataURLtoBlob(imgUrl);

            // 创建下载链接并下载
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('图片下载失败:', err);
        }
    };
    // 使用了一个辅助函数将dataUrl转为Blob
    function dataURLtoBlob(dataUrl) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    return (
        <div className={styles.page}>
            <Button onClick={handleDownload} type="primary" size="large">
                下载图片
            </Button>
            <div ref={captureRef}>
                <Table borderCell columns={totalColumns} data={total} pagination={false} style={{ marginBottom: 10 }}></Table>
                <Table borderCell columns={healthColumns} data={health} pagination={false} style={{ marginBottom: 10 }}></Table>
                <Table borderCell columns={natureColumns} data={nature} pagination={false} style={{ marginBottom: 10 }}></Table>
                <Table borderCell columns={psychologyColumns} data={psychology} pagination={false} style={{ marginBottom: 10 }}></Table>
                <Table borderCell columns={societyColumns} data={society} pagination={false} style={{ marginBottom: 10 }}></Table>
            </div>
        </div>
    );
}


