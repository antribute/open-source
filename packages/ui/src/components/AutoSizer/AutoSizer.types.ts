import ReactVirtualizedAutoSizer from 'react-virtualized-auto-sizer';

type ReactVirtualizedAutoSizerComponentProps = React.ComponentProps<
  typeof ReactVirtualizedAutoSizer
>;

export interface ReactVirtualizedAutoSizerProps
  extends Omit<ReactVirtualizedAutoSizerComponentProps, 'children'> {
  /**
   * @description
   *
   * Callback to be invoked on-resize; it is passed the following named parameters:
   *
   * ({ height: number, width: number }) => </>
   *
   * */
  onResize?: ReactVirtualizedAutoSizerComponentProps['onResize'];

  /**
   * @description
   *
   * Height passed to child for initial render; useful for server-side rendering.
   * This value will be overridden with an accurate height after mounting.
   *
   * */
  defaultHeight?: ReactVirtualizedAutoSizerComponentProps['defaultHeight'];

  /**
   *
   * @description
   *
   * Width passed to child for initial render; useful for server-side rendering.
   * This value will be overridden with an accurate width after mounting.
   *
   */
  defaultWidth?: ReactVirtualizedAutoSizerComponentProps['defaultWidth'];

  /**
   *
   * @description
   *
   * If specified, the child's height property will not be managed
   *
   */
  disableHeight?: ReactVirtualizedAutoSizerComponentProps['disableHeight'];

  /**
   *
   * @description
   *
   * If specified, the child's height property will not be managed
   *
   */
  disableWidth?: ReactVirtualizedAutoSizerComponentProps['disableWidth'];
}
