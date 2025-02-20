"use client";

//core
import ReactSelect, { MultiValue } from "react-select";

interface Option {
  label: string | null;
  value: string;
}

interface SelectProps {
  disabled: boolean;
  label: string;
  value?: Option | Option[];
  options: Option[];
  onChange: (value: Option | Option[]) => void;
}

const Select = ({ disabled, options, onChange, label, value }: SelectProps) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          options={options}
          onChange={(newValue: MultiValue<Option>) => {
            onChange([...newValue]);
          }}
          isMulti
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};
export default Select;
