import { RocketIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const RocketComponent = (props: Props) => {
  return (
    <RocketIcon size={32} className='fill-purple-600' style={{ transform: 'rotate(-45deg' }} />
  )
}

export default RocketComponent