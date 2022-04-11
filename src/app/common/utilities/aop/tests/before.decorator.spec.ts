import { Watcher } from './watcher.mock'
import { Before } from '../before.decorator'

describe('BeforeDecorator', () => {
  const watcher = new Watcher()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should modify a method to execute a function before the method', () => {
    jest.spyOn(watcher, 'observe')

    let sentinel: boolean

    function testFunction() {
      watcher.observe(true)
      sentinel = true
    }

    class FooBar {
      @Before(testFunction)
      bang() {
        sentinel = false
      }
    }

    const f = new FooBar()
    f.bang()
    expect(sentinel).toBeFalsy()
    expect(watcher.observe).toHaveBeenCalledWith(true)
  })

  it('should have access to the parameters', () => {
    let returnValue: boolean
    let originalMethodValue: boolean

    class AccessParameters {
      @Before((value: boolean) => (returnValue = value))
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
