import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store';

import type { TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

