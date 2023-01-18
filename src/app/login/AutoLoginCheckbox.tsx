'use client'

import { useState } from 'react'

import CheckBoxIcon from '../../svgs/CheckBoxIcon'

export default function AutoLoginCheckbox() {
  const [isChecked, setIsChecked] = useState(false)

  function setAutoLogin(e: any) {
    if (e.target.checked) {
      sessionStorage.setItem('autoLogin', 'true')
      setIsChecked(true)
    } else {
      sessionStorage.removeItem('autoLogin')
      setIsChecked(false)
    }
  }

  return (
    <label className="flex justify-center items-center gap-2 cursor-pointer" htmlFor="auto-login">
      <input id="auto-login" className="hidden" type="checkbox" onChange={setAutoLogin} />
      <CheckBoxIcon stroke={isChecked ? '#ae5705' : '#cbd5e1'} />
      <span className={isChecked ? 'text-fox-700' : 'text-slate-300'}>
        로그인 상태를 유지할게요
      </span>
    </label>
  )
}
