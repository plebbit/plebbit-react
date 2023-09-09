import { useAccountComments } from "@plebbit/plebbit-react-hooks"
import { useMemo, useCallback } from "react"

const useRepliesAndAccountReplies = (comment) => {
    // filter only the parent cid
    const filter = useCallback((accountComment) => accountComment.parentCid === (comment?.cid || 'n/a'), [comment?.cid])
    const { accountComments } = useAccountComments({ filter })

    // the account's replies have a delay before getting published, so get them locally from accountComments instead
    const accountRepliesNotYetPublished = useMemo(() => {
        const replies = comment?.replies?.pages?.topAll?.comments || []
        const replyCids = new Set(replies.map(reply => reply.cid))
        // filter out the account comments already in comment.replies, so they don't appear twice
        return accountComments.filter(accountReply => !replyCids.has(accountReply.cid))
    }, [comment?.replies?.pages?.topAll?.comments, accountComments])

    const repliesAndNotYetPublishedReplies = useMemo(() => {
        return [
            // put the author's unpublished replies at the top, latest first (reverse)
            ...accountRepliesNotYetPublished.reverse(),
            // put the published replies after,
            ...comment?.replies?.pages?.topAll?.comments || []
        ]
    }, [comment?.replies?.pages?.topAll?.comments, accountRepliesNotYetPublished])

    return repliesAndNotYetPublishedReplies || []
}

export default useRepliesAndAccountReplies