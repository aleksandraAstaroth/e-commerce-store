import { compose, either, isEmpty, isNil, not } from 'ramda'

export const isNilOrEmpty = either(isNil, isEmpty)
export function notIsNilOrEmpty<T>(value: T): value is Exclude<T, null | undefined | ''> {
	return compose(not, isNilOrEmpty)(value)
}
