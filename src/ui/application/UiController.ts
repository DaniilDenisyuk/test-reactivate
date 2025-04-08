import { action, observable } from 'mobx'
import { UiMode } from '../domain/utils'

export default class UiController {
  constructor() {
    this.mode = UiMode.public
  }

  @observable accessor mode: UiMode

  @action.bound
  async change(mode: UiMode) {
    this.mode = mode
  }
}
