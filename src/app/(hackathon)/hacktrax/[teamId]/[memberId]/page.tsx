import ViewTeamDetails from '@/components/hacktrax/ViewTeamDetails'
import { Suspense } from 'react'

// This is your server component
const HackDetails = async ({
    params,
}: {
    params: Promise<{
        teamId: string,
        memberId: string
    }>
}) => {
    const { teamId, memberId } = await params

    return (
        <div>
            <h1>Team ID: {teamId}</h1>
            <h1>Member ID: {memberId}</h1>
            <Suspense fallback={<p>Loading email...</p>}>
                <ViewTeamDetails />
            </Suspense>
        </div>
    )
}

export default HackDetails