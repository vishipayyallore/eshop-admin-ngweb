import { InterruptingBefore } from '../interrupting-before.decorator'

describe('InterruptingBefore', () => {
  it('should execute before the method', () => {
    class Before {
      value: boolean

      @InterruptingBefore(function () {
        this.value = true
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      method() {}
    }

    const ib = new Before()
    ib.method()

    expect(ib.value).toBeTruthy()
  })

  it('should interrupt the method execution', () => {
    class Interrupt {
      value: boolean
      @InterruptingBefore(function () {
        this.value = true
      })
      method() {
        this.value = false
      }
    }

    const ib = new Interrupt()
    ib.method()

    expect(ib.value).toBeTruthy()
  })

  it('should accept an aopdecoratorpayload response, triggering original method', () => {
    class PayloadRes {
      value: boolean
      @InterruptingBefore(function () {
        this.value = true
        return { flag: true }
      })
      method() {
        this.value = false
      }
    }

    const ib = new PayloadRes()
    ib.method()

    expect(ib.value).toBeFalsy()
  })

  it('should accept an aopdecoratorpayload response, preventing origianl method', () => {
    class InterruptPayloadRes {
      value: boolean
      @InterruptingBefore(function () {
        this.value = true
        return { flag: false }
      })
      method() {
        this.value = false
      }
    }

    const ib = new InterruptPayloadRes()
    ib.method()

    expect(ib.value).toBeTruthy()
  })

  it('should accept an aopdecoratorpayload response, preventing origianl method', () => {
    const console = global.console
    global.console = { info: jest.fn() } as any

    class LogInterrupts {
      value: boolean
      @InterruptingBefore(function () {
        this.value = true
        return { flag: false }
      })
      method() {
        this.value = false
      }
    }

    const ib = new LogInterrupts()
    ib.method()

    expect(global.console.info).toHaveBeenCalledWith(
      '[InterruptingBefore@LogInterrupts::method] interupting execution',
    )

    global.console = console
  })

  it('should accept an aopdecoratorpayload response, triggering original method on overridden parameters', () => {
    class OverridePayloadRes {
      value: boolean
      @InterruptingBefore(function (value: boolean) {
        this.value = value
        return { flag: true, payload: false }
      })
      method(value: boolean) {
        this.value = value
      }
    }

    const ib = new OverridePayloadRes()
    ib.method(true)

    expect(ib.value).toBeFalsy()
  })
})
