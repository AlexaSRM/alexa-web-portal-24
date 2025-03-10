// ClientComponent.tsx
'use client' // This marks it as a client component

import { useSearchParams } from 'next/navigation'

const ViewTeamDetails = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    
    return (
        <h1>Email: {email}</h1>
    )
}

export default ViewTeamDetails