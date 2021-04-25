export interface ChartData {
  selector: string[]; //选择
  data: SingleData[][];
  unit: string[];
  chartType: number; //图表类型
}

export interface SingleData {
  name: string; //单条数据名
  data: (string | number | object)[]; //单条数据
  axisData: string[]; //轴名
}
