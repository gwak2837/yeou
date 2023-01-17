'use client'

import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import Image from 'next/image'

import { fetchWithJWT, toastError } from '../../common/utils'

export default function Notifications() {
  const { data: notifications, isFetching } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchWithJWT('/notification'),
    onError: toastError,
  })

  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 m-4">
      {notifications?.map((notification: any) => (
        <li key={notification.id} className="border">
          <Image
            src={notification.imageURL ?? '/fox.webp'}
            alt="product preview"
            width="300"
            height="300"
          />
          <h3>{notification.name}</h3>
          <h4>{notification.option}</h4>
          <h4>{format(new Date(notification.creationTime), 'y년 M월 d일 H:m')}</h4>
        </li>
      ))}
    </ul>
  )
}
