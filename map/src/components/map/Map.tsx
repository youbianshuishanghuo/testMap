import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import echart from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';
import 'echarts/lib/chart/lines';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import { SingleData } from './Model';
import './chart.scss';
import { chinaMap } from './echart-china-map-disputed-area';
import { linesEndCoords } from './map-helper';
import { Spin } from 'antd';

interface MapProps {
  style?: CSSProperties;
  option?: echart.EChartOption | echart.EChartsResponsiveOption;
  config?: MapConfig;
  data: SingleData[];
  onOptionChange?: (option: echart.EChartOption) => void;
}

interface MapConfig {
  isShowLabel?: boolean;
  isShowLineLabel?: boolean;
}

const Map: React.FC<MapProps> = props => {
  const [isLoading, setLoading] = useState(true);
  const echartElement = useRef<HTMLDivElement>();
  const processOption = () => {
    if (!props.data) return {};
    let seriesData: echart.EChartOption.SeriesMap.DataObject[] = [];
    let visualMin: number = 0;
    let visualMax: number = 1;
    if (props.data.length > 0) {
      props.data[0].data.forEach((item, index) => {
        let value = Number(item);
        if (value) {
          seriesData.push({ value, name: props.data[0].axisData[index] });
          visualMax = Math.max(visualMax, value);
        }
      });
    }

    let getLineData = () => {
      let res: any[] = [];
      seriesData.forEach(item => {
        if (item.name && linesEndCoords.hasOwnProperty(item.name)) {
          let coords = linesEndCoords[item.name];
          coords[0].name = `${item.name}: ${item.value ? item.value : '--'}`;
          res.push(coords);
        }
      });
      return res;
    };

    let dataOption: echart.EChartOption<echart.EChartOption.SeriesMap> = {
      tooltip:
        props.data.length > 0
          ? {
            trigger: 'item',
            formatter: (params, ticket, callback) => {
              let paramsData = params instanceof Array ? params : [params];
              let cityNames: string[];
              let dataIndex: number;
              let result: string = `<div>地区：${paramsData[0].name}</div><div>${paramsData[0].seriesName}：--</div>`;
              if (paramsData[0].name) {
                cityNames = props.data[0].axisData;
                let name = paramsData[0].name;
                if (paramsData[0].name.indexOf(':') > -1) {
                  name = paramsData[0].name.split(':')[0];
                }
                dataIndex = cityNames.indexOf(name);
                if (dataIndex > -1) {
                  result = `<div>地区：${props.data[0].axisData[dataIndex]}</div>`;
                  props.data.forEach(item => {
                    result += `<div>${item.name}：${item.data[dataIndex]}</div>`;
                  });
                } else {
                  result = `<div>地区：${paramsData[0].name}</div>`;
                  props.data.forEach(item => {
                    result += `<div>${item.name}：--</div>`;
                  });
                }
              }
              return result;
            }
          }
          : {
            trigger: 'axis'
          },
      visualMap: [
        {
          //视觉映射
          min: visualMin,
          max: visualMax,
          text: ['高', '低'],
          textStyle: {
            color: '#999'
          }
        }
      ],
      series: [
        {
          type: 'map',
          itemStyle: {},
          map: 'china',
          data: seriesData,
          roam: true,
          showLegendSymbol: true,
          label: {
            show: props.config && !!props.config.isShowLabel,
            emphasis: {
              show: true
            }
          },
          nameMap: {
            台湾: '台湾省',
            河北: '河北省',
            山西: '山西省',
            内蒙古: '内蒙古自治区',
            辽宁: '辽宁省',
            吉林: '吉林省',
            黑龙江: '黑龙江省',
            江苏: '江苏省',
            浙江: '浙江省',
            安徽: '安徽省',
            福建: '福建省',
            江西: '江西省',
            山东: '山东省',
            河南: '河南省',
            湖北: '湖北省',
            湖南: '湖南省',
            广东: '广东省',
            广西: '广西省',
            海南: '海南省',
            四川: '四川省',
            贵州: '贵州省',
            云南: '云南省',
            西藏: '西藏自治区',
            陕西: '陕西省',
            甘肃: '甘肃省',
            青海: '青海省',
            宁夏: '宁夏自治区',
            新疆: '新疆自治区',
            北京: '北京市',
            天津: '天津市',
            上海: '上海市',
            重庆: '重庆市',
            香港: '香港',
            澳门: '澳门',
            钓鱼岛: '钓鱼岛',
            赤尾屿: '赤尾屿'
          },
          // @ts-ignore
          markLine:
            props.config && props.config.isShowLineLabel
              ? {
                lineStyle: {
                  type: 'solid'
                },
                data: getLineData()
              }
              : undefined
        }
      ]
    };
    return dataOption;
  };
  const [option, setOption] = useState<echart.EChartOption>({});
  useEffect(() => {
    setLoading(false);
  }, [props.data]);
  useEffect(() => {
    if (!props.option) return;
    let newOption: echart.EChartOption = {};
    for (let key in props.option) {
      newOption[key] = { ...option[key], ...props.option[key] };
    }
    setOption({ ...option, ...newOption });
  }, [props.option]);
  useEffect(() => {
    props.onOptionChange && props.onOptionChange(option);
  }, [option]);
  useEffect(() => {
    let dataOption = processOption();
    setOption(dataOption);
  }, [props.data]);
  useEffect(() => {
    if (echartElement.current != null) {
      echart.registerMap('china', chinaMap);
      const mapChart = echart.init(echartElement.current, 'yunlu');
      mapChart.clear();
      mapChart.resize();
      mapChart.on('click',(e) => {
        console.log(e)
      })
      window.addEventListener('resize', () => {
        mapChart.resize();
      });
      mapChart.setOption(option);
    }
    if (echartElement.current != null) {
      // 补充南海部分
      const areaElement = echartElement.current.querySelector('div.special-area');
      if (areaElement === null) {
        const mapElement = echartElement.current.querySelector('div');
        const appendImage = document.createElement('img');
        appendImage.className = 'special-area';
        appendImage.style.position = 'absolute';
        appendImage.style.bottom = '0';
        appendImage.style.right = '0';
        appendImage.style.width = '15%';
        appendImage.style.maxWidth = '75px';
        appendImage.style.backgroundColor = 'white';
        // @ts-ignore
        appendImage.src =
          'data:image/png;base64,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';
        // @ts-ignore
        mapElement.appendChild(appendImage);
      }
    }
  }, [option]);
  return (isLoading ?
    <div className="chart-container"
      style={props.style}>
      <Spin />
    </div> :
    <div
      id="map"
      className="chart-container"
      style={props.style}
      ref={e => {
        if (e != null) echartElement.current = e;
      }}
    />
  );
};

export default Map;
