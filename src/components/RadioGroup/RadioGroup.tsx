import { DEFAULT_MIN_VERSION } from 'node:tls';
import {
  Controller,
  FieldError,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

type RadioOptions = { label: string; value: string };

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: RadioOptions[];
  rules?: RegisterOptions<T, Path<T>>;
  error?: FieldError;
  label?: string;
  important?: boolean;
};

const RadioGroup = <T extends FieldValues>({
  name,
  options,
  control,
  rules,
  // error,
  label,
  important,
}: Props<T>) => {
  return (
    <div className="flex flex-col gap-4">
      {label &&
        (important ? (
          <div className="block font-semibold text-base leading-[137%]">
            {/* <label className="block font-semibold text-base leading-[137%]"> */}
            <span className="after:content-['*'] after:ml-2 after:text-current block">
              {label}
            </span>
          {/* </label> */}
          </div>
        ) : (
          <div className="font-semibold text-base leading-[137%]">
            {/* <label className="font-semibold text-base leading-[137%]"> */}
            {label}
         {/* </label> */}
          </div>
        ))}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => (
          <div className="flex flex-wrap gap-4">
            {options.map(option => {
              const isSelected = field.value === option.value;
              return (
                <label
                  key={option.value}
                  className={`cursor-pointer px-4 py-2 rounded-full border 
                    ${
                      isSelected
                        ? 'bg-primary text-white '
                        : 'border-gray-500 text-gray-500 hover:text-black hover:border-black'
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => field.onChange(option.value)}
                    className="hidden"
                  />
                  {option.label}
                </label>
              );
            })}
            {fieldState.error && (
              <p className="text-xs font-normal text-error">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default RadioGroup;
