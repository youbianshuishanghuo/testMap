import { ChartData } from './Model';
import {ResultChartDTO} from "@/api/BI";
type ParseType = 'header-selector' | 'bName-selector' | 'name-selector' | 'top5';

type ParseTypeV2 = 'header-selector';

function formatDataV2(apiData: ResultChartDTO, type?: ParseTypeV2): ChartData | null {
  if (!apiData || !apiData.config || !apiData.data) return null;
  let config = apiData.config;
  let data = apiData.data;
  let chartData: ChartData = {
    unit: config.units || [],
    chartType: config.type,
    selector: [],
    data: []
  };
  //指标 -> 选择器值
  if (type && type === 'header-selector') {
    chartData.selector = config.headers;
    config.headers.forEach(item => {
      chartData.data.push([]);
    });
    //对比数据
    for (let i = 0; i < data.length; i++) {
      let tableData = data[i].data;
      let length = tableData ? tableData.length : 0;
      //单表数据
      for (let j = 0; j < length; j++) {
        let item = tableData && tableData.length ? tableData[j] : {b_name: "", b_data: []};
        //单行数据
        for (let k = 0; k < config.headers.length; k++) {
          if (chartData.data[k].length < data.length) {
            chartData.data[k].push({
              name: data[i].name,
              data: [],
              axisData: []
            });
          }
          chartData.data[k][i].name = data[i].name;
          chartData.data[k][i].axisData.push(item.b_name);
          let dataIntem = item.b_data[k];
          if(Number(dataIntem)){
            dataIntem = Number(dataIntem).toFixed(2)
          }
          chartData.data[k][i].data.push(dataIntem);
        }
      }
    }
    return chartData;
  }
  //对比数据
  for (let i = 0; i < data.length; i++) {
    chartData.selector.push(data[i].name);
    chartData.data.push([]);
    config.headers.forEach(item => {
      chartData.data[i].push({ name: item, data: [], axisData: [] });
    });
    //单表数据
    let tableData = data[i].data;
    let length = tableData ? tableData.length : 0;
    for (let j = 0; j < length; j++) {
      let item = tableData && tableData.length ? tableData[j] : {b_name: "", b_data: []};
      //单行数据
      for (let k = 0; k < config.headers.length; k++) {
        let data = item.b_data[k];
        if(Number(data)){
          data = Number(data).toFixed(2)
        }
        chartData.data[i][k].data.push(data);
        chartData.data[i][k].axisData.push(item.b_name);
      }
    }
  }
  console.log(chartData)
  return chartData;
}
const formatMapData = (res)=>{
  let data = formatDataV2(res)
  let resData:any[] = []
  let firstData = data?.data[0][0]
  firstData?.axisData.map((item,index)=>{
    resData.push({name:item,value:firstData?.data[index],unit:data?.unit[0]})
  })
  resData.map((item,index)=>{
    item.data = []
    data?.data[0].map((d)=>{
      item.data.push({name:d.name,value:d.data[index]})
    })
  })
  console.log('-----------------')
  console.log(resData)
  return resData
}
//数据正序<->倒序
function sortData(chartData: ChartData): ChartData {
  if (chartData === null) return chartData;
  chartData.data.map(item =>
    item.map(item => {
      item.axisData.reverse();
      item.data.reverse();
    })
  );
  return chartData;
}

//数据过滤
function fliterData(chartData: ChartData, fliterName: string[] = ['总计']): ChartData {
  if (chartData === null) return chartData;
  chartData.data.map(item =>
    item.map(item => {
      let fliterIndex: number[] = [];
      item.axisData = item.axisData.filter((item, index) => {
        let nameIndex = fliterName.indexOf(item);
        nameIndex > -1 && fliterIndex.push(nameIndex);
        return nameIndex < 0;
      });
      item.data = item.data.filter((item, index) => fliterIndex.indexOf(index) < 0);
    })
  );
  return chartData;
}

export { formatDataV2, sortData, fliterData ,formatMapData};
