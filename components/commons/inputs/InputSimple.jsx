export default function InputSimple({title,value,changeFunction, type='text', placeholder}) {
  return (
    <div>
      <label
        htmlFor={title.toLowerCase()}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1">
        <input
          onChange={(e) => changeFunction(e.target.value)}
          value={value}
          id={title}
          name={title}
          type={type}
          
          placeholder={placeholder}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}
