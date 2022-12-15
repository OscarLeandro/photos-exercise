import { ExclamationCircleIcon } from "@heroicons/react/20/solid";


export default function InputError({title,value,changeFunction, type='text', placeholder, errorMessage}) {
  return (
    <div>
      <label
        htmlFor={title.toLowerCase()}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          onChange={(e) => changeFunction(e.target.value)}
          value={value}
          id={title}
          name={title}
          type={type}
          autoComplete="displayName"
          className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          placeholder={placeholder}
          aria-invalid="true"
          aria-describedby="email-error"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {errorMessage}
      </p>
    </div>
  );
}
