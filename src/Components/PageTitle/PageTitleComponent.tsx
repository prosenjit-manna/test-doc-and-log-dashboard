import { Button } from '@mantine/core';
import React from 'react'
 
export default function PageTitleComponent({ title, additionalButton = false, onClick, buttonText }: {
  title: string;
  additionalButton: boolean;
  onClick?: () => void;
  buttonText?: string;
}) {
  return (
    <>
    <h1 className='flex-1'>{title}</h1>
    {additionalButton && 
      <Button variant="filled" onClick={onClick}>{buttonText}</Button>
    }
    </>
  )
}
