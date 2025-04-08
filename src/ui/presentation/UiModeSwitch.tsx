import type UiController from '@/ui/application/UiController'
import { UiMode } from '@/ui/domain/utils'
import { observer } from 'mobx-react'
import type React from 'react'

export type SwitchProps = Pick<UiController, 'mode' | 'change'> &
  React.HTMLAttributes<HTMLDivElement>

export default observer(function UiModeSwitch({ mode, change }: SwitchProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    change(e.target.value as UiMode)
  }
  return (
    <div>
      <p>Mode</p>
      <label>
        <input
          name="mode"
          type="radio"
          value={UiMode.public}
          checked={mode === UiMode.public}
          onChange={onChange}
        />
        Public
      </label>
      <label>
        <input
          name="mode"
          type="radio"
          value={UiMode.private}
          checked={mode === UiMode.private}
          onChange={onChange}
        />
        Private
      </label>
    </div>
  )
})
