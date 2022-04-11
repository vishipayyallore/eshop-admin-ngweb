import { After } from '../after.decorator'

describe('AfterDecorator', () => {
  it('should modify a method to execute a function after the method', () => {
    let returnValue: boolean
    class FooBar {
      @After(() => (returnValue = true))
      bang() {
        returnValue = false
      }
    }

    const f = new FooBar()
    f.bang()
    expect(returnValue).toBeTruthy()
  })

  it('should have access to the parameters', () => {
    let returnValue: boolean
    let originalMethodValue: boolean

    class AccessParameters {
      @After((value: boolean) => (returnValue = value))
      bang(value: boolean) {
        originalMethodValue = value
      }
    }

    const f = new AccessParameters()
    f.bang(true)
    expect(returnValue).toBeTruthy()
    expect(originalMethodValue).toBeTruthy()
  })
})
