'use client';

import { createChart, ColorType, CandlestickSeries, LineSeries } from 'lightweight-charts'; // 1. Series 종류를 직접 import 해야 함
import React, { useEffect, useRef } from 'react';

export const StockChart = ({ data, colors: {
    backgroundColor = 'white',
    lineColor = '#2962FF',
    textColor = 'black',
} = {} }: any) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartContainerRef.current) {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            }
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: backgroundColor },
                textColor,
            },
            width: chartContainerRef.current.clientWidth,
            height: 400,
        });
        
        chart.timeScale().fitContent();

        // 2. addCandlestickSeries 대신 addSeries 사용
        const mainSeries = chart.addSeries(CandlestickSeries, { 
            upColor: '#26a69a', 
            downColor: '#ef5350', 
            borderVisible: false, 
            wickUpColor: '#26a69a', 
            wickDownColor: '#ef5350', 
        });

        // 데이터 넣어주기
        // (캔들스틱 데이터 포맷: time, open, high, low, close)
        const candleData = data.map((d: any) => ({
            time: d.time,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close
        }));
        mainSeries.setData(candleData);

        // 3. 이동평균선(SMA)도 addSeries(LineSeries)로 변경
        // 데이터에 sma 값이 있는 경우에만 그림
        if (data.length > 0 && data[0].sma) {
             const smaSeries = chart.addSeries(LineSeries, { color: lineColor, lineWidth: 1 });
             const smaData = data
                .filter((d: any) => d.sma)
                .map((d: any) => ({ time: d.time, value: d.sma }));
             smaSeries.setData(smaData);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, backgroundColor, lineColor, textColor]);

    return <div ref={chartContainerRef} className="w-full" />;
};