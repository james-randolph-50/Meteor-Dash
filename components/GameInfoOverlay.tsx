import { LoaderIcon, RocketIcon } from 'lucide-react';
import React from 'react'

type Props = {
    info: any
}

const GameInfoOverlay = ({info}: Props) => {
    const {isLoading, isDetected, isColliding, distance, livesRemainingState, isGameOver } = info;
    const lives = [];
    for(let i=0;i<livesRemainingState;i++){
        lives.push(<RocketIcon key={i} size={20} className='fill-purple-600' />)
    }

  return (
    <div className={`absolute z-30 h-screen w-screen flex items-center justify-center  ${isColliding && 'border-[20px] border-red-400'}`}>
        {isLoading && <LoaderIcon size={80} className='animate-spin' />}
        {!isLoading && !isDetected && !isGameOver && <div className="text-4xl animate-pulse font-extrabold">Paused</div>}
        {isGameOver && <div className="text-4xl animate-pulse font-extrabold">GAME OVER</div>}
        <div className='fixed top-6 right-6'>{`Distance: ${distance}`}</div>
        <div className='fixed top-12 right-6 flex gap-1'>{lives}</div>
    </div>
  )
}

export default GameInfoOverlay