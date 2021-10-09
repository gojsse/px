import { useState } from 'react'
import { ExclamationCircleIcon, PencilAltIcon } from '@heroicons/react/solid'

type ComponentProps = {
  name: string
  type: string
  value?: string
  label?: string
  placeholder?: string
  defaultValue?: string
  errors: {
    name: string
    text: string
  }[],
  onChange: (value?: string) => void
}

const editClass = 'border-1 border-white block w-full pr-10 focus:outline-none sm:text-sm rounded-md'
const readOnlyClass = 'border-1 border-white block w-full pr-10 focus:outline-none sm:text-sm'
const errorClass = 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'

const TextInput = ({
  name = 'field',
  type = 'text',
  value,
  label,
  placeholder,
  defaultValue,
  errors = [],
  onChange
}: ComponentProps) => {

  const [isEditMode, setIsEditMode] = useState(false)

  const optionalProps = {
    ...(label && {label}),
    ...(placeholder && {placeholder}),
    ...(defaultValue && {defaultValue}),
  }

  const hasErrors = errors.length > 0
  let inputClass = isEditMode ? editClass : readOnlyClass
  inputClass += (isEditMode && hasErrors) ? ` ${errorClass}` : ''

  return (
    <div>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          className={'font-bold ' + inputClass}
          onChange={(event) => onChange(event.currentTarget.value)}
          onClick={() => setIsEditMode(true)}
          onBlur={() => setIsEditMode(false)}
          { ...optionalProps }
        />
        {hasErrors && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <ExclamationCircleIcon className='h-5 w-5 text-red-500' aria-hidden='true' />
          </div>
        )}
        {!hasErrors && !isEditMode && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <PencilAltIcon className='h-5 w-5' aria-hidden='true' />
          </div>
        )}
      </div>
      {hasErrors && (
        <p className='mt-2 text-sm text-red-600' id={`${errors[0].name}-error`}>
          {errors[0].text}
        </p>
      )}
    </div>
  )
}

export default TextInput
