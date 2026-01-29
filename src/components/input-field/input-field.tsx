'use client'
import Icon from '@/components/icon'
import { ChangeEventHandler, KeyboardEventHandler, ReactNode, RefObject, useId } from 'react'
import { twMerge } from 'tailwind-merge'
import { LoadingSpinner } from '../loading/loading'

export type InputFieldProps = {
	onCleared?: () => void
	hasError?: boolean
	leadingElements?: ReactNode
	trailingElements?: ReactNode
	supportingText?: ReactNode
	placeholder?: string
	label?: string
	inputRef?: RefObject<HTMLInputElement | null>
	onChange?: ChangeEventHandler<HTMLInputElement>
	onKeyUp?: KeyboardEventHandler<HTMLInputElement>
	value?: string
	name?: string
	loading?: boolean
	focused?: boolean
	dense?: boolean
	autoFocus?: boolean
} & { type?: Exclude<React.InputHTMLAttributes<HTMLInputElement>['type'], 'number'> }

export function InputField({
	leadingElements,
	trailingElements,
	hasError,
	supportingText,
	placeholder,
	label,
	inputRef,
	onChange,
	value,
	name,
	loading,
	onKeyUp,
	type,
	focused,
	dense,
	autoFocus,
}: InputFieldProps) {
	const id = useId()

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		onChange?.(e)
	}

	return (
		<div className="grid gap-0.5 h-fit">
			<label
				htmlFor={id}
				aria-invalid={hasError}
				data-focused={focused}
				onMouseUp={e => {
					const inputField = e.currentTarget.getElementsByTagName('input')[0]
					if (!inputField) return

					if (e.target !== inputField) {
						e.currentTarget.getElementsByTagName('input')[0].click()
					}
				}}
				onMouseDown={e => {
					const inputField = e.currentTarget.getElementsByTagName('input')[0]
					if (!inputField) return

					if (e.target !== inputField) {
						e.preventDefault()
					}

					e.currentTarget.getElementsByTagName('input')[0].focus()
				}}
				className={twMerge(
					'group min-h-14 cursor-text data-[focused=true]:border-neon-turquoise focus-within:border-neon-turquoise  border-solid border rounded-sm pl-3 py-1 flex gap-3 items-center aria-invalid:border-red aria-disabled:bg-disabled aria-disabled:text-on-disabled aria-disabled:cursor-not-allowed data-[readonly=true]:cursor-default',
					leadingElements ? 'pr-3' : undefined,
					dense ? 'min-h-8' : undefined,
				)}
			>
				{leadingElements ? <div className="grid w-fit items-center grid-flow-col gap-3">{leadingElements}</div> : null}
				<div className="flex flex-1 flex-col-reverse overflow-hidden">
					<input
						type={type}
						autoFocus={autoFocus}
						name={name}
						value={value}
						onChange={handleChange}
						onInput={handleChange}
						ref={inputRef}
						placeholder={placeholder}
						onKeyUp={onKeyUp}
						className="peer p-0 m-0 min-w-0 w-full outline-hidden bg-transparent  group-aria-disabled:cursor-not-allowed group-data-[readonly=true]:cursor-default  overflow-hidden"
						id={id}
					/>
					{label ? (
						<div aria-invalid={hasError} className={twMerge('text-xs font-semibold aria-invalid:text-color-red')}>
							{label}
						</div>
					) : null}
				</div>
				<div hidden={!loading}>
					<LoadingSpinner size="sm" />
				</div>
				{hasError ? <Icon src="Warning" className="text-color-red" /> : null}
				{trailingElements ? <div className="grid items-center grid-flow-col gap-3">{trailingElements}</div> : null}
			</label>
			{supportingText ? (
				<span aria-invalid={hasError} className="d  aria-invalid:text-color-red">
					{supportingText}
				</span>
			) : null}
		</div>
	)
}
