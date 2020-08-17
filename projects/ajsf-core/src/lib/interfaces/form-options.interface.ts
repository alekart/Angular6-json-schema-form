import {WidgetOptionsInterface} from '@alekart/ajsf-core/interfaces/widget-options.interface';

export interface FormOptionsInterface {
  /**
   * Allow the web browser to remember previous form submission values as defaults
   * @Default true
   */
  autocomplete: boolean;
  /**
   * Whether the form should add submit button automatically:
   * true (always), false (never), 'auto' (only if layout is undefined)
   * @Default 'auto'
   */
  addSubmit: boolean | 'auto';
  /**
   * Show debugging output
   * @Default false
   */
  debug: boolean;
  /**
   * Disable submit if form is invalid.
   * @Default true
   */
  disableInvalidSubmit: boolean;
  /**
   * Set form disabled (not editable, disabled outputs)
   * @Default false
   */
  formDisabled: boolean;
  /**
   * Set entire form as read only (not editable, enabled outputs)
   * @Default false
   */
  formReadonly: boolean;
  /**
   * (set automatically) Are there any required fields in the form?
   * TODO: make better description
   * @Default false
   */
  fieldsRequired: boolean;
  /**
   * The framework to load
   */
  framework: 'no-framework' | string;
  /**
   * Load external css and JavaScript for framework
   * @Default false
   */
  loadExternalAssets: boolean;
  /**
   * TODO: description
   * @Default { errors: true, success: true };
   */
  pristine: { errors: boolean; success: boolean };
  /**
   * TODO: description
   * @Default false
   */
  supressPropertyTitles: boolean;
  /**
   * Set default values from schema into inputs on form initialization
   * - true: always set (unless overridden by layout default or formValues)
   * - false: never set
   * - 'auto': set in addable components, and everywhere if formValues not set
   * @Default "auto"
   */
  setSchemaDefaults: boolean | 'auto';
  /**
   * Set default values from layout into inputs on form initialization
   * - true = always set (unless overridden by formValues)
   * - false = never set
   * - 'auto' = set in addable components, and everywhere if formValues not set
   * @Default "auto"
   */
  setLayoutDefaults: boolean | 'auto';
  /**
   * Whether the form should return values for fields that contain no data
   * @Default true
   */
  returnEmptyFields: boolean;
  /**
   * Validate fields immediately, before they are touched
   * - true = validate all fields immediately
   * - false = only validate fields after they are touched by user
   * - 'auto' = validate fields with values immediately, empty fields after they are touched
   * @Default "auto"
   */
  validateOnRender: boolean | 'auto';
  /**
   * Custom widgets to load
   * TODO: define better type and describe
   */
  widgets: {};

  defautWidgetOptions: WidgetOptionsInterface;
  /**
   * @deprecated renamed into defautWidgetOptions
   */
  defaultOptions?: WidgetOptionsInterface;
}
