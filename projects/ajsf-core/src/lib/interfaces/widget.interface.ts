import {Pointer} from '../shared';

export interface WidgetInterface {
  options?: any;
  dataIndex?: number[];
  layoutIndex?: number[];
  layout?: any[];
  layoutNode: {
    options?: {}
    name?: string;
    value?: any;
    dataPointer: Pointer;
  };
  isOrderable?: boolean;

  formControl?;
  boundControl?;
  controlName?: string;
  controlValue?: any;
  controlDisabled?: boolean;
}
