import { XCircleIcon } from '@heroicons/react/24/solid'
import { UseFormRegister, Path } from 'react-hook-form'

interface Props<T extends object> {
  id: Path<T>
  label: string
  placeholder: string
  value: string
  register: UseFormRegister<T>
  clear: () => void
  error?: string
}

const InputWithClear = <T extends object>({
  id,
  label,
  placeholder,
  value,
  register,
  clear,
  error,
}: Props<T>) => (
  <div>
    <label htmlFor={id} className="block mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className="w-full py-2 pl-3 pr-10 border border-slate-300 dark:border-zinc-700 rounded-xl"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400 dark:text-zinc-700 dark:hover:text-zinc-600 cursor-pointer"
        >
          <XCircleIcon className="size-5" />
        </button>
      )}
    </div>
    {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
  </div>
)

export default InputWithClear
