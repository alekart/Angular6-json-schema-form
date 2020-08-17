/**
 * Form control widget options
 */
export interface WidgetOptionsInterface {
  /**
   * Number of list items to initially add to arrays with no default value
   * @Default 1
   */
  listItems: number;
  /**
   * Allow adding items to an array or $ref point?
   * @Default true
   */
  addable: boolean;
  /**
   * Allow reordering items within an array?
   * @Default true
   */
  orderable: boolean;
  /**
   * Allow removing items from an array or $ref point?
   * @Default true
   */
  removable: boolean;
  /**
   * Apply 'has-error' class when field fails validation?
   * @Default true
   */
  enableErrorState: boolean;
  /**
   * Apply 'has-success' class when field validates?
   * @Default true
   */
  enableSuccessState: boolean;
  /**
   * Show inline feedback icons?
   * @Default false
   */
  feedback: boolean;
  /**
   * Show errorMessage on Render?
   * @Default false
   */
  feedbackOnRender: boolean;
  /**
   * Hide title?
   * @Default false
   */
  notitle: boolean;
  /**
   * Set control as disabled? (not editable; and excluded from output)
   * @Default false
   */
  disabled: boolean;
  /**
   * Set control as read only? (not editable; but included in output)
   * @Default false
   */
  readonly: boolean;
  /**
   * set by setLanguage()
   * @Default {}
   */
  validationMessages: {};
}
