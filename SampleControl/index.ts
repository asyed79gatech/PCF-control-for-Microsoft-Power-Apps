import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { createRoot, Root } from "react-dom/client";
import { Matrix } from "./Matrix";
export class VisitsAssessments implements ComponentFramework.StandardControl<IInputs, IOutputs> {
 private _container!: HTMLDivElement;
 private _root: Root | undefined;
 private _notify!: () => void;
 private _json = "";
 public init(ctx: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, _state: any, container: HTMLDivElement): void {
   this._notify = notifyOutputChanged;
   this._container = container;
   // coalesce null to undefined
   const initial: string | undefined = ctx.parameters.tableData?.raw ?? undefined;
   if (initial) this._json = initial;
   this._root = createRoot(container);
   this._root.render(React.createElement(Matrix, { initialJson: initial, onChange: this.onChange }));
 }
 private onChange = (json: string) => { this._json = json; this._notify(); };
 public updateView(ctx: ComponentFramework.Context<IInputs>): void {
   const incoming: string | undefined = ctx.parameters.tableData?.raw ?? undefined;
   this._root?.render(React.createElement(Matrix, { initialJson: incoming, onChange: this.onChange }));
 }
 public getOutputs(): IOutputs { return { tableData: this._json }; }
 public destroy(): void { this._root?.unmount(); }
}

