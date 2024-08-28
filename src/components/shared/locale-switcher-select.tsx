'use client';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, ReactNode, useTransition } from 'react';
import { Label } from '../ui/label';
type Props = {
  children: ReactNode;
  defaultValue: string;
};
export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  function onSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = e.target.value.toLowerCase();
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  }
  return (
    <Label
      className={cn(
        'relative text-gray-900',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6 bg-gray-200 rounded-sm font-bold"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 -top-1 font-bold">
        ⌄
      </span>
    </Label>
  );
}
