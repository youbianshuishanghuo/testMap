import { mUsefulArray } from "@/utils/convert";

interface mapObjProps {
  [propName: string]: string
}

export function transTableData(originData) {
  let tableData: any = { tableHeader: [], tableContent: [] };

  return tableData;
}

export function transformTableData(originData, mapObj?: mapObjProps) {
  let tableData: any = { tableHeader: [], tableContent: [] };
  let tempArray: string[] = [];
  if (mUsefulArray(originData)) {
    originData.forEach(item => {
      if (!mapObj) {
        Object.keys(item).map(key => {
          if (tempArray.indexOf(key) < 0) tempArray.push(key);
        });
      }
      tableData.tableContent.push(item);
    });

    mapObj && Object.keys(mapObj).map(key => {
      tableData.tableHeader.push({ title: mapObj[key] ? mapObj[key] : key, dataIndex: key, editable: false });
    });

    if (tempArray.length > 0) {
      tempArray.forEach(value => {
        tableData.tableHeader.push({ title: value, dataIndex: value, editable: false });
      });
    }
  }
  return tableData;
}