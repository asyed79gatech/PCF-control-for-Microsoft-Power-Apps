import * as React from "react";
type Row = { RowHeader: string; Cells: string[] };
type TablePayload = { Columns: string[]; Rows: Row[] };
export type MatrixProps = {
 initialJson?: string;
 onChange: (json: string) => void;
};
const DEFAULT_TABLE: TablePayload = {
 Columns: ["Visit 1", "Visit 2"],
 Rows: [
   { RowHeader: "Blood Pressure", Cells: ["", ""] },
   { RowHeader: "ECG", Cells: ["", ""] }
 ]
};
function parsePayload(raw?: string): TablePayload {
 if (!raw || raw.trim() === "") return DEFAULT_TABLE;
 try {
   const obj = JSON.parse(raw) as TablePayload;
   if (!Array.isArray(obj.Columns) || !Array.isArray(obj.Rows)) return DEFAULT_TABLE;
   const cols = obj.Columns;
   const rows = obj.Rows.map(r => ({
     RowHeader: r.RowHeader ?? "",
     Cells: Array.isArray(r.Cells)
       ? r.Cells.slice(0, cols.length).concat(Array(Math.max(cols.length - r.Cells.length, 0)).fill(""))
       : Array(cols.length).fill("")
   }));
   return { Columns: cols, Rows: rows };
 } catch {
   return DEFAULT_TABLE;
 }
}
export const Matrix: React.FC<MatrixProps> = ({ initialJson, onChange }) => {
 const init = React.useMemo(() => parsePayload(initialJson), [initialJson]);
 const [columns, setColumns] = React.useState<string[]>(init.Columns);
 const [rows, setRows] = React.useState<Row[]>(init.Rows);
 React.useEffect(() => {
   onChange(JSON.stringify({ Columns: columns, Rows: rows }));
 }, [columns, rows]);
 const addColumn = () => {
   const name = `Col ${columns.length + 1}`;
   setColumns(prev => [...prev, name]);
   setRows(prev => prev.map(r => ({ ...r, Cells: [...r.Cells, ""] })));
 };
 const addRow = () => {
   setRows(prev => [...prev, { RowHeader: "New Row", Cells: Array(columns.length).fill("") }]);
 };
 const removeColumn = (i: number) => {
   setColumns(prev => prev.filter((_, idx) => idx !== i));
   setRows(prev => prev.map(r => ({ ...r, Cells: r.Cells.filter((_, idx) => idx !== i) })));
 };
 const removeRow = (i: number) => {
   setRows(prev => prev.filter((_, idx) => idx !== i));
 };
 const renameColumn = (i: number, v: string) => {
   setColumns(prev => prev.map((c, idx) => (idx === i ? v : c)));
 };
 const renameRow = (i: number, v: string) => {
   setRows(prev => prev.map((r, idx) => (idx === i ? { ...r, RowHeader: v } : r)));
 };
 const setCell = (rIndex: number, cIndex: number, v: string) => {
   setRows(prev => {
     const copy = [...prev];
     const row = { ...copy[rIndex] };
     const cells = [...row.Cells];
     cells[cIndex] = v;
     row.Cells = cells;
     copy[rIndex] = row;
     return copy;
   });
 };
 return (
<div className="dm-container">
<div className="dm-toolbar">
<button type="button" onClick={addRow}>+ Add Row</button>
<button type="button" onClick={addColumn}>+ Add Column</button>
</div>
<div className="dm-table-wrapper">
<table className="dm-table" cellPadding={4} cellSpacing={0}>
<thead>
<tr>
<th style={{ minWidth: 180 }}>Row Header</th>
             {columns.map((c, i) => (
<th key={i}>
<input value={c} onChange={e => renameColumn(i, e.target.value)} className="dm-input dm-col-header" />
<button type="button" className="dm-danger" onClick={() => removeColumn(i)}>×</button>
</th>
             ))}
</tr>
</thead>
<tbody>
           {rows.map((r, ri) => (
<tr key={ri}>
<td>
<div className="dm-row-head">
<input value={r.RowHeader} onChange={e => renameRow(ri, e.target.value)} className="dm-input dm-row-header" />
<button type="button" className="dm-danger" onClick={() => removeRow(ri)}>×</button>
</div>
</td>
               {columns.map((_, ci) => (
<td key={ci}>
<input value={r.Cells[ci] ?? ""} onChange={e => setCell(ri, ci, e.target.value)} className="dm-input dm-cell" />
</td>
               ))}
</tr>
           ))}
</tbody>
</table>
</div>
</div>
 );
};