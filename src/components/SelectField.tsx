"use client";

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  helpText?: string;
};

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  helpText,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#17312b]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-md border border-[#c9d9d3] bg-white px-3 py-3 text-[#17312b] outline-none transition focus:border-[#116a5b] focus:ring-2 focus:ring-[#b8dccc]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText ? <p className="mt-1 text-sm text-[#5f746f]">{helpText}</p> : null}
    </div>
  );
}
