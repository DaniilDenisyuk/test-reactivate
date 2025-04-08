import { UiMode } from '../domain/utils'
import UiStore from './UiStore'

const uiStore = new UiStore()

describe('Ui Store behavior testing', () => {
  test('Mode should be public by default', () => {
    expect(uiStore.mode).toBe(UiMode.public)
  })

  test('Mode should change correctly', () => {
    uiStore.change(UiMode.private)
    expect(uiStore.mode).toBe(UiMode.private)
  })
})
