import { Button } from '@mantine/core';
import React from 'react'
 
export default function PageTitleComponent({ title, additionalButton = false, onClick, buttonText, className }: {
  title: string;
  additionalButton: boolean;
  onClick?: () => void;
  buttonText?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center ${className}`}>
    <h1 className='flex-1'>{title}</h1>
    {additionalButton && 
      <Button variant="filled" onClick={onClick}>{buttonText}</Button>
    }
    </div>
  )
}
