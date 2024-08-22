import { LoaderIcon } from 'lucide-react';
import React from 'react'

type Props = {
    info: any
}

const GameInfoOverlay = ({info}: Props) => {
    const {isLoading, isDetected, isColliding, distance } = info;

  return (
    <div className={`absolute z-30 h-screen w-screen flex items-center justify-center  ${isColliding && 'border-[20px] border-red-400'}`}>
        {isLoading && <LoaderIcon size={80} className='animate-spin' />}
        {!isLoading && !isDetected && <div className="text-4xl animate-pulse font-extrabold">Paused</div>}
        <div className='fixed top-6 right-6'>{`Distance: ${distance}`}</div>
    </div>
  )
}

export default GameInfoOverlay