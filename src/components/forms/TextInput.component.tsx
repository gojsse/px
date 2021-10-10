import { useEffect, useState } from 'react'
import { ExclamationCircleIcon, PencilAltIcon } from '@heroicons/react/solid'

type ComponentProps = {
  name: string
  type: string
  value?: string
  label?: string
  maxLength?: number
  minLength?: number
  placeholder?: string
  defaultValue?: string
  errors: {
    name: string
    text: string
  }[],
  onChange: (value?: string) => void
}

const editClass = 'border-1 border-white block w-full w-80 focus:outline-none sm:text-sm rounded-md'
const readOnlyClass = 'border-1 border-white block w-full pl-2 py-3 pr-10 focus:outline-none sm:text-sm'
const errorClass = 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'

const TextInput = ({
  name = 'field',
  type = 'text',
  value = '',
  label,
  maxLength,
  minLength = 0,
  placeholder,
  defaultValue,
  errors = [],
  onChange
}: ComponentProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const optionalProps = {
    ...(label && {label}),
    ...(placeholder && {placeholder}),
    ...(defaultValue && {defaultValue}),
    ...(minLength && {minLength}),
    ...(maxLength && {maxLength}),
  }

  const hasErrors = errors.length > 0
  const inputClass = hasErrors ? `${editClass} ${errorClass}` : editClass

  return (
    <div>
      {label && (
        <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
          {label}
        </label>
      )}
      <div className='relative'>
        {isEditMode ? (
          <input
            type={type}
            name={name}
            id={name}
            value={inputValue}
            className={'font-bold ' + inputClass}
            onChange={(event) => setInputValue(event.currentTarget.value)}
            onBlur={(event) => {
              setIsEditMode(false)
              onChange(event.currentTarget.value)
            }}
            { ...optionalProps }
          />
        ) : (
          <div
            className={'font-bold ' + readOnlyClass}
            onClick={() => setIsEditMode(true)}
          >
            {value}
          </div>
        )}
        {hasErrors && isEditMode && (
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
