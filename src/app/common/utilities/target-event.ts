export class TargetEvent<T> extends InputEvent {
  override target: ValuedTarget<T>

  constructor(type: string, eventInitDict?: InputEventInit | undefined, value?: T) {
    super(type, eventInitDict)
    this.target = new ValuedTarget<T>()
  }
}

export class ValuedTarget<T> extends EventTarget {
  value?: T
}