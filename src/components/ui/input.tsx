import { Label } from './label';

// Packages
import React, { useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Eye as EyeIcon, EyeClosed as EyeClosedIcon } from 'lucide-react';

// Libs
import { cn } from '@/libs/utils';

const inputVariants = cva(
  'flex h-10 w-full data-[suffix-item=true]:pr-10 data-[prefix-item=true]:pl-10 rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-primary focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]',
  {
    variants: {
      variant: {
        default: '',
        error:
          'border border-red-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none',
      },
      size: {
        sm: 'h-9 px-2 text-sm placeholder-sm',
        default: 'h-10 px-2 text-base',
        lg: 'h-11 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  isPassword?: boolean;
  label?: string;
  suffixItem?: React.ReactNode | null;
  prefixItem?: React.ReactNode | null;
  classDiv?: string;
  removeHeight?: boolean;
  removeAnimation?: boolean;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      variant,
      isPassword = false,
      size,
      prefixItem = null,
      suffixItem = null,
      removeAnimation = false,
      removeHeight = false,
      required,
      error,
      classDiv,
      ...props
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(true);

    const handleShowPassword = () => {
      if (!isPassword) return;

      const newType = showPassword ? 'text' : 'password';

      setInputType(newType);
      setShowPassword(!showPassword);
    };

    return (
      <div
        data-remove-animation={removeAnimation}
        data-remove-height={removeHeight}
        className={`${classDiv || ''} block data-[remove-height=false]:min-h-[85px] data-[remove-height=false]:translate-y-4 data-[remove-animation=false]:animate-[fadeIn_0.5s_ease-out_forwards] data-[remove-animation=false]:opacity-0`}
      >
        {label && (
          <Label
            htmlFor={props?.id}
            className={`text-base ${error ? 'text-red-600' : ''}`}
          >
            {label} {required && <span className="text-foreground">*</span>}
          </Label>
        )}
        <div className="relative max-w-full">
          {prefixItem && (
            <div className="absolute bottom-0 left-4 top-0 flex items-center">
              {prefixItem}
            </div>
          )}
          <input
            type={inputType}
            data-suffix-item={Boolean(suffixItem)}
            data-prefix-item={Boolean(prefixItem)}
            className={cn(
              inputVariants({
                variant: error ? 'error' : variant,
                size,
                className,
              }),
            )}
            ref={ref}
            autoCapitalize="off"
            {...props}
          />
          {isPassword && (
            <div
              className="absolute bottom-0 right-4 top-0 flex items-center"
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <EyeIcon className="h-5 w-5 cursor-pointer text-gray-400" />
              ) : (
                <EyeClosedIcon className="h-5 w-5 cursor-pointer text-gray-400" />
              )}
            </div>
          )}
          {suffixItem && (
            <div className="absolute bottom-0 right-4 top-0 flex items-center">
              {suffixItem}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] text-xs text-red-600 opacity-0">
            {error}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
