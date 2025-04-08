import { UiMode } from '../domain/utils'
import UiController from './UiController'

const uiStore = new UiController()

describe('Ui Controller behavior testing', () => {
  test('Mode should be public by default', () => {
    expect(uiStore.mode).toBe(UiMode.public)
  })

  test('Mode should change correctly', () => {
    uiStore.change(UiMode.private)
    expect(uiStore.mode).toBe(UiMode.private)
  })
})
