import React, { useState,useMemo , useRef} from 'react';
import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from "@ag-grid-community/core";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import DetailCellRenderer from "../detailCellRenderer.jsx";
import { MenuModule } from "@ag-grid-enterprise/menu";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  MenuModule,
]);


  const DataGrid = () => {
  // Row Data: The data to be displayed.
  const [rowData] = useState([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October'  },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August'  },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February'  },
    { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January'  },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March'  },
    { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July'  },
    { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September'  },
    { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false, month: 'December'  },
    { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false, month: 'April'  },
    { make: 'Fiat', model: 'Panda', price: 13724, electric: false, month: 'November'  },
    { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true, month: 'May'  },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October'  },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August'  },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February'  },
    { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January'  },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March'  },
    { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July'  },
    { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September'  },
    { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false, month: 'December'  },
    { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false, month: 'April'  },
    { make: 'Fiat', model: 'Panda', price: 13724, electric: false, month: 'November'  },
    { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true, month: 'May'  },
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, month: 'June' },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false, month: 'October'  },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false, month: 'August'  },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true, month: 'February'  },
    { make: 'Fiat', model: '500', price: 15774, electric: false, month: 'January'  },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false, month: 'March'  },
    { make: 'Vauxhall', model: 'Corsa', price: 18460, electric: false, month: 'July'  },
    { make: 'Volvo', model: 'EX30', price: 33795, electric: true, month: 'September'  },
    { make: 'Mercedes', model: 'Maybach', price: 175720, electric: false, month: 'December'  },
    { make: 'Vauxhall', model: 'Astra', price: 25795, electric: false, month: 'April'  },
    { make: 'Fiat', model: 'Panda', price: 13724, electric: false, month: 'November'  },
    { make: 'Jaguar', model: 'I-PACE', price: 69425, electric: true, month: 'May'  },
  ]);

  const [columnDefs] = useState([
    {
      headerName: 'Name',
      field: "make",
      cellRenderer: 'agGroupCellRenderer'
  },
  { field: "model" },
  { field: "price", filter: 'agNumberColumnFilter' },
  { field: "electric" },
  {
      field: "month",
      comparator: (valueA, valueB) => {
          const months = [
              'January', 'February', 'March', 'April',
              'May', 'June', 'July', 'August',
              'September', 'October', 'November', 'December',
          ];
          const idxA = months.indexOf(valueA);
          const idxB = months.indexOf(valueB);
          return idxA - idxB;
      },
  }
  ]);

  // const detailCellRenderer = useCallback(DetailCellRenderer, []);

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    }
  }, []);

  // const onFirstDataRendered = useCallback((params) => {
  //   params.api.forEachNode(function (node) {
  //     node.setExpanded(node.id === "1");
  //   });
  // }, []);


  return (
    
    <div className="ag-theme-quartz" style={{ height: 600,width:950 }}>
    <AgGridReact
      rowData={rowData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      masterDetail={true}
      rowSelection="multiple"
      suppressRowClickSelection={true}
      pagination={true}
      paginationPageSize={10}
      paginationPageSizeSelector={[10, 25, 50]}
    />
</div>
  );
}

// Setting default values for the props of DataTable
DataGrid.defaultProps = {
 
};

// Typechecking props for the DataTable
DataGrid.propTypes = {

};

export default DataGrid;
