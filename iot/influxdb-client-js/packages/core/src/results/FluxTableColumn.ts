/**
 * Type of query result column, see {@link https://docs.influxdata.com/influxdb/latest/reference/syntax/annotated-csv/#data-types }
 */
export type ColumnType =
  | 'boolean'
  | 'unsignedLong'
  | 'long'
  | 'double'
  | 'string'
  | 'base64Binary'
  | 'dateTime:RFC3339'
  | 'duration'
  | string

/**
 * FluxTableColumn describes {@link http://bit.ly/flux-spec#table | flux table} column.
 */
export interface FluxTableColumn {
  /**
   * Label (e.g., "_start", "_stop", "_time").
   */
  label: string

  /**
   * The data type of column (e.g., "string", "long", "dateTime:RFC3339").
   */
  dataType: ColumnType

  /**
   * Boolean flag indicating if the column is a part of the table's group key.
   */
  group: boolean

  /**
   * Default value to be used for rows whose string value is an empty string.
   */
  defaultValue: string

  /**
   * Index of this column in a row array.
   */
  index: number

  /**
   * Get returns a JavaScript object of this column in the supplied result row, using default deserializers.
   * @param row - a data row
   * @returns column value
   */
  get: (row: string[]) => any
}

const identity = (x: string): any => x

/**
 * A dictionary of serializers of particular types returned by a flux query.
 * See {@link https://docs.influxdata.com/influxdb/latest/reference/syntax/annotated-csv/#data-types }
 */
export const typeSerializers: Record<ColumnType, (val: string) => any> = {
  boolean: (x: string): any => (x === '' ? null : x === 'true'),
  unsignedLong: (x: string): any => (x === '' ? null : +x),
  long: (x: string): any => (x === '' ? null : +x),
  double(x: string): any {
    switch (x) {
      case '':
        return null
      case '+Inf':
        return Number.POSITIVE_INFINITY
      case '-Inf':
        return Number.NEGATIVE_INFINITY
      default:
        return +x
    }
  },
  string: identity,
  base64Binary: identity,
  duration: (x: string): any => (x === '' ? null : x),
  'dateTime:RFC3339': (x: string): any => (x === '' ? null : x),
}

/**
 * FluxTableColumn implementation.
 */
class FluxTableColumnImpl implements FluxTableColumn {
  label: string
  dataType: ColumnType
  group: boolean
  defaultValue: string
  index: number
  public get(row: string[]): any {
    let val = row[this.index]
    if ((val === '' || val === undefined) && this.defaultValue) {
      val = this.defaultValue
    }
    return (typeSerializers[this.dataType] ?? identity)(val)
  }
}
export const UNKNOWN_COLUMN: FluxTableColumn = Object.freeze({
  label: '',
  dataType: '',
  group: false,
  defaultValue: '',
  index: Number.MAX_SAFE_INTEGER,
  get: () => undefined,
})

/**
 * Creates a new flux table column.
 * @returns column instance
 */
export function newFluxTableColumn(): FluxTableColumn {
  return new FluxTableColumnImpl()
}

/**
 * Creates a flux table column from a partial FluxTableColumn.
 * @param object - source object
 * @returns column instance
 */
export function createFluxTableColumn(
  object: Partial<FluxTableColumn>
): FluxTableColumn {
  const retVal = new FluxTableColumnImpl()
  retVal.label = String(object.label)
  retVal.dataType = object.dataType as ColumnType
  retVal.group = Boolean(object.group)
  retVal.defaultValue = object.defaultValue ?? ''
  retVal.index = object.index ?? 0
  return retVal
}
