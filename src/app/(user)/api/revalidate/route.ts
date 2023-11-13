import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// http://localhost:3000/api/revalidate?tag=track-by-id&secret=justASecretForJWT

export async function POST(request: NextRequest) {
    const tag = request.nextUrl.searchParams.get('tag')
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret != process.env.MY_SECRET_TOKEN) {
        return NextResponse.json({ message: 'Invalid secret', status: 401 })
    }

    if (!tag) {
        return NextResponse.json({ message: 'Missing tag param', status: 400 })
    }

    revalidateTag(tag)
    return NextResponse.json({ revalidated: true, now: Date.now() })
}